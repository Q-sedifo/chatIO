import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/drive.readonly openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {

      if (user) {
        token.id = user.id
      }
      
      if (account?.access_token) {
        token.accessToken = account.access_token
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id: string }).id = token.id as string
        
        (session as any).accessToken = token.accessToken
      }

      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
}