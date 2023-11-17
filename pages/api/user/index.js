import * as User from '../../../models/user.js';
import * as Token from '../../../models/token.js';
import { AppError } from '../../../errors/index.js';

export default async function getHandler(request, response) {
  if (request.method === 'GET') {
    try {
      const accessToken = Token.getTokenByCookie(request)
      const decodedToken = await Token.verifyTokenOnCookies(accessToken)
      const user = await User.findById(decodedToken.id);

      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(401).json({ message: "This user cannot access this resource." });
      }
    }
  } else {
    return response.status(405).end();
  }
}
