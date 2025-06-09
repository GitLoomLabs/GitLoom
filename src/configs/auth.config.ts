import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

export default {
  session: { strategy: 'jwt' },
  providers: [
    GitHub({
      authorization: { params: { scope: 'read:user user:email repo' } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) token.accessToken = account.access_token;
      if (profile?.login) token.username = profile.login;
      return token;
    },
    async session({ session, token }) {
      (session as typeof session & { accessToken: string }).accessToken =
        token.accessToken as string;
      if (token.username && typeof token.username === 'string') {
        (session.user as typeof session.user & { username: string }) = {
          ...session.user,
          username: token.username,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
