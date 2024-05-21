import crypto from 'node:crypto';
import database from '../infra/database.js';
import 'dotenv/config';
import { AppError } from '../errors/index.js';

const SESSION_EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 30; // 30 days

export async function createRefreshToken(userId) {
  const sessionToken = crypto.randomBytes(48).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * SESSION_EXPIRATION_IN_SECONDS);

  const query = {
    text: `INSERT INTO sessions (token, user_id, expires_at)
            VALUES($1, $2, $3) RETURNING *;`,
    values: [sessionToken, userId, expiresAt],
  };

  const results = await database.query(query);
  return results.rows[0];
}

export async function findOneByRequest(request) {
  const { session_id } = request.body;

  if (!session_id) {
    throw new AppError({
      message: 'This user does not have an active session',
      statusCode: 401,
    });
  }

  const sessionObjectToken = await findOneByToken(session_id);

  if (!sessionObjectToken) {
    throw new AppError({
      message: 'This user does not have an active session',
      statusCode: 401,
    });
  }

  return sessionObjectToken;
}

async function findOneByToken(sessionToken) {
  const query = {
    text: `SELECT * FROM sessions WHERE token = $1 AND expires_at > now();`,
    values: [sessionToken],
  };

  const results = await database.query(query);
  return results.rows[0];
}

export async function findOneByUserId(userId) {
  const query = {
    text: 'SELECT token FROM sessions WHERE user_id = $1;',
    values: [userId],
  };

  const results = await database.query(query);
  return results.rows[0];
}
