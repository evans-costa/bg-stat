import { AppError } from '../errors';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export function createAccessToken(userId, response) {
  const accessToken = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '10s' },
  );

  setAuthCookie(accessToken, response);
}

function setAuthCookie(authToken, response) {
  response.setHeader('Set-Cookie', [
    cookie.serialize('accessToken', authToken, {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    }),
  ]);
}

export function getTokenByCookie(request) {
  const getAccessToken = request.cookies?.accessToken;

  if (!getAccessToken) {
    throw new AppError({
      message: 'There are no token provided in this session',
      statusCode: 403,
    });
  }

  return getAccessToken;
}

export async function verifyTokenOnCookies(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(new AppError({
          message: err.message,
          statusCode: 403,
        }));
      } else {
        resolve(decoded)
      }
    })
  });
}
