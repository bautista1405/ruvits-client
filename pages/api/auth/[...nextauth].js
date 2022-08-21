import NextAuth from "next-auth";
import Providers from "next-auth/providers";


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],

  database: process.env.NEXT_PUBLIC_MONGODB_URI,

  callbacks: {
    session: async (session, user, token) => {
      session.id = user._id;
      return session;                           
    },
  },
});