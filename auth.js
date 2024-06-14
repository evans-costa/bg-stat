import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';

import { comparePassword } from '@/models/authentication';
import { findByEmail } from '@/models/user';

import { signInSchema } from './lib/zod';

import { InvalidLoginError } from '@/errors';
import { ZodError } from 'zod';

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
          label: 'password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          const { password, email } =
            await signInSchema.parseAsync(credentials);

          const user = await getUser(email);

          const passwordMatch = await comparePassword(password, user.password);

          if (passwordMatch) return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw new InvalidLoginError();
        }
      },
    }),
  ],
});
