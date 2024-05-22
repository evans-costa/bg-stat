import { CredentialsSignin } from 'next-auth';

export class AppError extends Error {
  constructor({ message, statusCode }) {
    super();
    this.message = message;
    this.statusCode = statusCode || 500;
  }
}

export class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid credentials custom';
}
