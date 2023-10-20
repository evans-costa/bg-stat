import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import "dotenv/config";

export async function comparePassword(userPasswordInput, passwordHash) {
  const passwordMatches = await bcrypt.compare(userPasswordInput, passwordHash);

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
