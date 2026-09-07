import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { connectDb } from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        await connectDb();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("user doesn't exist!");
        }

        if (!user.password) {
          throw new Error("This account uses Google sign-in");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("incorrect password!");
        }

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!user.email || profile?.email_verified === false) {
        return false;
      }

      await connectDb();
      const existingUser = await User.findOne({ email: user.email });
      const databaseUser =
        existingUser ??
        (await User.create({
          name: user.name ?? user.email.split("@")[0],
          email: user.email,
        }));

      user.id = String(databaseUser._id);
      user.name = databaseUser.name;
      user.role = databaseUser.role;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        token.id = user.id ?? token.id;
        token.role = user.role ?? token.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
        session.user.id = token.id as string | undefined;
        session.user.role =
          typeof token.role === "string" ? token.role : undefined;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
  },
  secret:process.env.AUTH_SECRET
});
