'use server';

import { signIn } from 'auth';
import { InvalidLoginError } from 'errors';

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof InvalidLoginError) {
      return error.code;
    }
  }
}
