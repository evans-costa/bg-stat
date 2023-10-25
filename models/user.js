import * as database from "../infra/database.js";
import bcryptjs from "bcryptjs";
import { AppError } from "../errors";

export async function create(userData) {
  if (!userData.email || !userData.password || !userData.username) {
    throw new AppError({
      message: "Fill all the inputs!",
      statusCode: 400,
    });
  }

  const queryValidateEmail = {
    text: `SELECT email FROM users WHERE email = $1;`,
    values: [userData.email],
  };

  const resultValidateEmail = await database.query(queryValidateEmail);

  if (resultValidateEmail.rowCount > 0) {
    throw new AppError({
      message: "This email is already registered!",
      statusCode: 400,
    });
  }

  const queryValidateUsername = {
    text: `SELECT username FROM users WHERE username = $1;`,
    values: [userData.username],
  };

  const resultValidateUsername = await database.query(queryValidateUsername);

  if (resultValidateUsername.rowCount > 0) {
    throw new AppError({
      message: "This username is already registered!",
      statusCode: 400,
    });
  }

  const hashedPassword = await bcryptjs.hash(userData.password, 10);

  const insertUserQuery = {
    text: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`,
    values: [userData.username, userData.email, hashedPassword],
  };

  const resultUserCreated = await database.query(insertUserQuery);
  const newUser = resultUserCreated.rows[0];

  return newUser;
}

export async function findByEmail(userEmail) {
  const queryFindEmail = {
    text: `SELECT * FROM users WHERE email = $1;`,
    values: [userEmail],
  };

  const result = await database.query(queryFindEmail);

  if (result.rowCount === 0) {
    throw new AppError({
      message: "This email not exists in our database",
      statusCode: 400,
    });
  }

  return result.rows[0];
}
