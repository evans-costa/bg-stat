import { AppError } from "../../../errors/index.js";
import * as User from "../../../models/user.js";

export default async function postHandler(request, response) {
  if (request.method === "POST") {
    try {
      const data = request.body;

      await User.create(data);

      return response
        .status(201)
        .json({ message: "User created successfully!" });
    } catch (error) {
      if (error instanceof AppError) {
        console.error(error);
        return response.status(400).json({ message: error.message });
      }
    }
  } else {
    response.status(405).end();
  }
}
