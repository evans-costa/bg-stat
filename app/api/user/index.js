import * as User from '../../../models/user.js';
import * as Token from '../../../models/token.js';
import * as Session from '../../../models/sessions.js';
import { AppError } from '../../../errors/index.js';

export default async function getHandler(request, response) {
  if (request.method === 'GET') {
    try {
      const accessToken = Token.getTokenByCookie(request);
      const verifiedToken = await Token.verifyTokenOnCookies(accessToken);
      const user = await User.findById(verifiedToken.id);
      const sessionId = await Session.findOneByUserId(user.id);

      return response
        .status(200)
        .json({ user: user, session_id: sessionId.token });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(401).json({ message: error.message });
      }
    }
  } else {
    return response.status(405).end();
  }
}
