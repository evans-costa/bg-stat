import * as user from "../../../models/user.js";

export default async function postHandler(request, response) {
  if (request.method === "POST") {
    try {
      const data = request.body;

      await user.create(data);

      return response
        .status(201)
        .json({ message: "User created successfully!" });
    } catch (error) {
      console.error(error);
      return response
        .status(400)
        .json({ message: "Error while creating user, please try again" });
    }
  } else {
    res.status(405).end();
  }
}
