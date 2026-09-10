import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Session object — used everywhere via useSession() and auth()
   * Both `name` (next-auth standard) and `fullname` (legacy main site) are available.
   */
  interface Session {
    user: {
      id: string;
      email: string;
      /** next-auth standard field — used by UserMenuButton, super-shop navbar */
      name?: string | null;
      /** backward compat — used by main site Navbar.tsx */
      fullname?: string | null;
      /** profile picture URL */
      image?: string | null;
      /** "USER" | "ADMIN" | "MODERATOR" | "VOLUNTEER" | "LIBRARIAN" | "INSTRUCTOR" */
      role: string;
      isFamilyMember?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string | null;
    fullname?: string | null;
    image?: string | null;
    role: string;
    isFamilyMember?: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback */
  interface JWT {
    id?: string;
    email?: string;
    name?: string | null;
    fullname?: string | null;
    image?: string | null;
    role?: string;
    isFamilyMember?: boolean;
    lastChecked?: number;
    emailVerified?: string;
  }
}
