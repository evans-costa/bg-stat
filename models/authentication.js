import { AppError } from "../errors";
import session from "./sessions.js";
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

export function findValidAccessCookie(request, next) {
  const accessToken = request.headers["authorization"]?.split(" ") || [
    " ",
    " ",
  ];

  if (!accessToken) {
    throw new AppError({
      message: "There are no access token on cookies",
      statusCode: 401,
    });
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userIdFromToken = typeof payload !== "string" && payload.id;

    if (!userIdFromToken) {
      throw new AppError({
        message: "The token provided is invalid",
        statusCode: 401,
      });
    }

    return next();
  } catch (error) {
    return error;
  }
}

export async function createSessionAndAccessToken(userId, response) {
  const refreshToken = await session.createRefreshToken(userId);
  createAccessToken(userId, response);
  return refreshToken;
}
