import * as User from '../../../models/user.js';
import * as Session from '../../../models/sessions.js';

import { AppError } from '../../../errors/index.js';
import 'dotenv/config';

export default async function getHandler(request, response) {
  if (request.method === 'GET') {
    try {
      const getUserByCookie = Session.findTokenAndValidateOnSession(request);

      const user = await User.findById(getUserByCookie.id);

      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        response.status(401).json({ message: error.message });
      } else {
        response.status(401).json({ message: 'User is not authenticated.' });
      }
    }
  } else {
    return response.status(405).end();
  }
}
