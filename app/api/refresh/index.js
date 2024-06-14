import { AppError } from '../../../errors';
import * as Sessions from '../../../models/sessions';
import * as Token from '../../../models/token';

export default async function postHandler(request, response) {
  if (request.method === 'POST') {
    try {
      console.log(request.body);
      const userSession = await Sessions.findOneByRequest(request);
      Token.createAccessToken(userSession.userId, response);

      return response.status(200).json();
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(401)
          .json({ message: 'This user cannot access this resource.' });
      }
    }
  } else {
    return response.status(405).end();
  }
}
