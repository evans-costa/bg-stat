import { AppError } from '../errors';
import * as Session from './sessions.js';
import * as Token from './token.js';
import bcryptjs from 'bcryptjs';
import 'dotenv/config';

export async function comparePassword(userPasswordInput, passwordHash) {
  const passwordMatches = await bcryptjs.compare(
    userPasswordInput,
    passwordHash,
  );

  if (!passwordMatches) {
    throw new AppError({
      message: 'The informed password does not match with user password',
      statusCode: 400,
    });
  }
}

export async function createSessionAndAccessToken(userId, response) {
  const refreshToken = await Session.createRefreshToken(userId);
  Token.createAccessToken(userId, response);
  return refreshToken;
}
