import { AppError } from '@/errors';
import * as user from '@/models/user';

export async function POST(request) {
  try {
    const data = await request.json();

    await user.create(data);

    return Response.json({
      status: 201,
      message: 'User created successfully!',
    });
  } catch (error) {
    if (error instanceof AppError) {
      return Response.json({
        status: error.statusCode,
        message: error.message,
      });
    }
  }
}
