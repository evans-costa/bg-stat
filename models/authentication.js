import { AppError } from "../errors";
import * as Session from "./sessions.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcryptjs from "bcryptjs";
import "dotenv/config";

export async function comparePassword(userPasswordInput, passwordHash) {
  const passwordMatches = await bcryptjs.compare(
    userPasswordInput,
    passwordHash,
  );

  if (!passwordMatches) {
    throw new AppError({
      message: "The informed password does not match with user password",
      statusCode: 400,
    });
  }
}

export function createAccessToken(userId, response) {
  const accessToken = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  setAuthCookie(accessToken, response);
}

function setAuthCookie(authToken, response) {
  response.setHeader("Set-Cookie", [
    cookie.serialize("accessToken", authToken, {
      httpOnly: true,
      maxAge: 3600,
      path: "/",
    }),
  ]);
}

export async function createSessionAndAccessToken(userId, response) {
  const refreshToken = await Session.createRefreshToken(userId);
  createAccessToken(userId, response);
  return refreshToken;
}
