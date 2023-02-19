import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const clientId = String(process.env.GOOGLE_CLIENT_ID);
const clientSecret = String(process.env.GOOGLE_CLIENT_SECRET);
const nextAuthSecret = String(process.env.NEXTAUTH_SECRET);

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  secret: nextAuthSecret,
  jwt: {
    maxAge:  30 * 1 * 60 // 1 day
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
