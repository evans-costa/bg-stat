import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import * as database from "../infra/database.js";
import { AppError } from "../errors/index.js";
import { NextResponse } from "next/server";

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

export function findTokenAndValidateOnSession(request) {
  const accessToken = request.cookies?.accessToken;

  if (!accessToken) {
    return NextResponse.next(
      new AppError({
        message: "There are no token provided in this session",
        statusCode: 401,
      }),
    );
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!decoded) {
    return NextResponse.next(
      new AppError({
        message: "The token is invalid.",
        statusCode: 401,
      }),
    );
  }

  return decoded;
}
