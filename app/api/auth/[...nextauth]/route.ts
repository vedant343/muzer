import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

// [...nextauth] === [...anything]

const handler = NextAuth({
  //sign in with google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
});

export { handler as GET, handler as POST };
// both are similar
// export const GET = handler;
// export const POST = handler;
