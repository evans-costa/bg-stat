'use server';

import { signIn, signOut } from 'auth';
import { InvalidLoginError } from 'errors';

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof InvalidLoginError) {
      return error.code;
    }
    throw error;
  }
}

export async function signOutForm() {
  await signOut();
}
