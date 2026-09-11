import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock user for MVP — replace with real DB lookup in production
const MOCK_USER = {
  id: "user-001",
  name: "Alex Chen",
  email: "demo@gloyce.co",
  password: "demo123",
  company: "My Company LLC",
  role: "client",
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (
          credentials.email === MOCK_USER.email &&
          credentials.password === MOCK_USER.password
        ) {
          return {
            id: MOCK_USER.id,
            name: MOCK_USER.name,
            email: MOCK_USER.email,
            company: MOCK_USER.company,
            role: MOCK_USER.role,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/vi/auth/login",
    error: "/vi/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.company = (user as typeof MOCK_USER).company;
        token.role = (user as typeof MOCK_USER).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof MOCK_USER & { id: string }).id = token.id as string;
        (session.user as typeof MOCK_USER).company = token.company as string;
        (session.user as typeof MOCK_USER).role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "gloyce-dev-secret-change-in-production",
};
