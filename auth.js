import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { comparePassword } from './models/authentication';
import { findByEmail } from './models/user';

import { InvalidLoginError } from './errors';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/',
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          user = await findByEmail(credentials.email);

          const passwordMatch = await comparePassword(
            credentials.password,
            user.password,
          );

          if (passwordMatch) return user;
        } catch (error) {
          throw new InvalidLoginError();
        }
      },
    }),
  ],
});
