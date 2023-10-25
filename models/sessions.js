import crypto from "node:crypto";
import * as database from "../infra/database.js";

const SESSION_EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 30; // 30 days

export async function createRefreshToken(userId) {
  const sessionToken = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * SESSION_EXPIRATION_IN_SECONDS);

  const query = {
    text: `INSERT INTO sessions (token, user_id, expires_at)
            VALUES($1, $2, $3) RETURNING *;`,
    values: [sessionToken, userId, expiresAt],
  };

  const results = await database.query(query);
  return results.rows[0];
}
