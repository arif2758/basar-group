import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { z } from "zod"
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Zod validation
        const parsed = z
          .object({
            email: z.string().min(1),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // 1. Check if user is the root admin (from env or username)
        if (
          (email === process.env.ADMIN_USERNAME || email === "admin" || email === "admin@basargroup.com") &&
          password === (process.env.ADMIN_PASSWORD || "basaradmin2026")
        ) {
          return {
            id: "0",
            email: "admin@basargroup.com",
            name: "Super Admin",
            fullname: "Super Admin",
            image: null,
            role: "ADMIN",
            isFamilyMember: true,
          };
        }

        await connectToDB();

        // 2. Check if user exists in database
        const user = await User.findOne({ email });
        if (!user) throw new CredentialsSignin("InvalidCredentials");

        // 3. Verify password
        if (!user.password) throw new CredentialsSignin("InvalidCredentials");
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new CredentialsSignin("InvalidCredentials");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullname,          // next-auth standard field
          fullname: user.fullname,      // backward compat for main site
          image: user.profilePicture ?? null,
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
          // Auto-register OAuth user
          const newUser = new User({
            fullname: user.name || profile?.name || "Google User",
            email: user.email,
            profilePicture: user.image || (profile as { picture?: string })?.picture,
            // role and isFamilyMember get Mongoose defaults (USER, false)
          });
          await newUser.save();
        } else if (user.image || (profile as { picture?: string })?.picture) {
          // Ensure profile picture is updated from Google
          const googlePic = user.image || (profile as { picture?: string })?.picture;
          if (existingUser.profilePicture !== googlePic) {
            existingUser.profilePicture = googlePic;
            await existingUser.save();
          }
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, account }) {
      const now = Date.now();
      const tokenLastChecked = (token.lastChecked as number) || 0;
      const shouldRefresh = now - tokenLastChecked > 5 * 60 * 1000; // 5 min refresh

      // OAuth: mark email verified
      if (account?.provider === "google") {
        token.emailVerified = new Date().toISOString();
      }

      // Hardcoded Super Admin fast-track (avoids DB query)
      if (user?.id === "0" || token?.id === "0" || user?.email === "admin@basargroup.com" || token?.email === "admin@basargroup.com") {
        token.id = "0";
        token.email = "admin@basargroup.com";
        token.name = "Super Admin";
        token.fullname = "Super Admin";
        token.image = null;
        token.role = "ADMIN";
        token.isFamilyMember = true;
        token.lastChecked = now;
        return token;
      }

      if (user || trigger === "update" || shouldRefresh) {
        await connectToDB();
        const emailToFind = user?.email || token?.email;

        if (emailToFind) {
          const dbUser = await User.findOneAndUpdate(
            { email: emailToFind },
            { lastLogin: new Date() },
            { returnDocument: 'after' }
          );

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.email = dbUser.email;
            token.name = dbUser.fullname;           // next-auth standard
            token.fullname = dbUser.fullname;       // backward compat
            token.image = dbUser.profilePicture || user?.image || (token.image as string) || null;
            token.role = dbUser.role;
            token.isFamilyMember = dbUser.isFamilyMember;
            token.lastChecked = now;
          } else if (user) {
            // Fallback for hardcoded Super Admin (not in DB)
            token.id = user.id;
            token.email = user.email;
            token.name = (user as { fullname?: string; name?: string }).fullname ?? user.name;
            token.fullname = (user as { fullname?: string }).fullname ?? user.name;
            token.image = user.image ?? null;
            token.role = (user as { role?: string }).role;
            token.isFamilyMember = (user as { isFamilyMember?: boolean }).isFamilyMember;
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
        session.user.name = token.name as string;         // next-auth standard (UserMenuButton uses this)
        session.user.fullname = token.fullname as string; // backward compat (main Navbar uses this)
        session.user.image = token.image as string | null;
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
    error: "/login",
  },
  trustHost: true,
})