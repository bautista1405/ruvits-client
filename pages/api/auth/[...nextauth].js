import NextAuth from "next-auth";
import Providers from "next-auth/providers";


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: "12741627097-2nq9aqbvpfet9hespaonh4o2c7rdg2g0.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],

  database: process.env.NEXT_PUBLIC_MONGODB_URI,

  callbacks: {
    session: async (session, user) => {
      session.id = user._id;
      session.mpAccessToken = user.mpAccessToken //here we add the 'mpAccessToken' from the 'user'
      return session;                           //to be returned within the 'session' object
    },
  },
});