'use server';

import { signIn, signOut } from '@/auth';
import { InvalidLoginError } from '@/errors';
import { redirect } from 'next/navigation';

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof InvalidLoginError) {
      return error.code;
    }
  }
  redirect('/dashboard');
}

export async function signOutForm() {
  await signOut();
}
