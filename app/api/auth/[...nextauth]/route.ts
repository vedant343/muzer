import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { prismaClient } from "@/app/lib/db";

// [...nextauth] === [...anything]

const handler = NextAuth({
  //sign in with google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log(params);
      if (!params.user.email) {
        return false;
      }
      try {
        await prismaClient.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });
      } catch (e) {}
      return true;
    },
  },
});

export { handler as GET, handler as POST };
// both are similar
// export const GET = handler;
// export const POST = handler;
