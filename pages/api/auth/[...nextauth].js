import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: '12741627097-2nq9aqbvpfet9hespaonh4o2c7rdg2g0.apps.googleusercontent.com',
        clientSecret: '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',
        authorizationUrl: 'https://accounts.google.com/o/oauth2/auth'
    })
    // ...add more providers here
  ],
  jwt: {
    encryption: true
  },
  secret: "secret token",
  callbacks: {

    async jwt(token, account) {

      if (account ?.accessToken) {

        token.accessToken = account.accessToken

      }

      return token;

    },

    redirect: async (url, _baseUrl)=>{

      if (url === '/user') {

        return Promise.resolve('/')

      }

      return  Promise.resolve('/')

    }

  }
});