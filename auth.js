import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';

import { comparePassword } from '@/models/authentication';
import { findByEmail } from '@/models/user';

import { InvalidLoginError } from '@/errors';

async function getUser(email) {
  try {
    const user = await findByEmail(email);
    return user;
  } catch (error) {
    console.error('Failed to fetch user: ', error);
    throw error;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        const user = await getUser(credentials.email);

        if (!user) return null;

        try {
          const passwordMatch = await comparePassword(
            credentials.password,
            user.password,
          );

          if (passwordMatch) return user;
        } catch (error) {
          throw new InvalidLoginError();
        }

        return null;
      },
    }),
  ],
});
