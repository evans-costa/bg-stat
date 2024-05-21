import * as User from '../../../models/user.js';
import * as Authentication from '../../../models/authentication.js';

export default async function postHandler(request, response) {
  if (request.method === 'POST') {
    let userLogin;

    try {
      const data = request.body;

      userLogin = await User.findByEmail(data.email);

      await Authentication.comparePassword(data.password, userLogin.password);
    } catch (error) {
      if (error) {
        return response.status(400).json({
          message: 'The data is incorrect, please enter your data again.',
        });
      }
    }

    const sessionObject = await Authentication.createSessionAndAccessToken(
      userLogin.id,
      response,
    );
    
    return response.status(201).json({ refreshToken: sessionObject });
  } else {
    return response.status(405).end();
  }
}
