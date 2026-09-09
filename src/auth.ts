import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { User } from "./models/User"

// Ensure Mongoose connects for authorize and callbacks
async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDB();

        // 1. Check if user is the root admin (from env)
        if (
          credentials.email === process.env.ADMIN_USERNAME && // Still matches admin username if needed
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "0", email: credentials.email as string, fullname: "Super Admin", role: "ADMIN", isFamilyMember: true };
        }

        // 2. Check if user exists in database
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // 3. Verify password
        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          fullname: user.fullname,
          role: user.role,
          isFamilyMember: user.isFamilyMember,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDB();
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Auto-register OAuth user via Mongoose (respects schema defaults)
          const newUser = new User({
            fullname: user.name || profile?.name || "Google User",
            email: user.email,
            profilePicture: user.image || profile?.picture,
            // role and isFamilyMember will automatically get Mongoose defaults (USER, false)
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      const now = Date.now();
      const tokenLastChecked = token.lastChecked as number || 0;
      const shouldRefresh = (now - tokenLastChecked) > 5 * 60 * 1000; // Auto refresh every 5 mins

      if (user || trigger === "update" || shouldRefresh) {
        // Fetch latest data from our MongoDB
        await connectToDB();
        const emailToFind = user?.email || token?.email;
        if (emailToFind) {
          const dbUser = await User.findOne({ email: emailToFind });

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.email = dbUser.email;
            token.fullname = dbUser.fullname || user?.name || token.fullname;
            token.role = dbUser.role;
            token.isFamilyMember = dbUser.isFamilyMember;
            token.lastChecked = now;
          } else if (user) {
            // Fallback (e.g. for hardcoded Super Admin)
            token.id = user.id;
            token.email = user.email;
            token.fullname = user.fullname || user.name;
            token.role = user.role;
            token.isFamilyMember = user.isFamilyMember;
            token.lastChecked = now;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.fullname = token.fullname as string;
        session.user.role = token.role as string;
        session.user.isFamilyMember = token.isFamilyMember as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
})