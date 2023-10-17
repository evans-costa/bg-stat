import * as database from "../infra/database.js";
import bcrypt from "bcrypt";

export async function create(userData) {
  if (!userData.email || !userData.password || !userData.username) {
    throw new Error("Fill all the inputs!");
  }

  const queryValidateEmail = {
    text: `SELECT email FROM users WHERE email = $1;`,
    values: [userData.email],
  };

  const resultValidateEmail = await database.query(queryValidateEmail);

  if (resultValidateEmail.rowCount > 0) {
    throw new Error("This email is already registered!");
  }

  const queryValidateUsername = {
    text: `SELECT username from users WHERE username = $1;`,
    values: [userData.username],
  };

  const resultValidateUsername = await database.query(queryValidateUsername);

  if (resultValidateUsername.rowCount > 0) {
    throw new Error("This username is already registered!");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const insertUserQuery = {
    text: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`,
    values: [userData.username, userData.email, hashedPassword],
  };

  const resultUserCreated = await database.query(insertUserQuery);
  const newUser = resultUserCreated.rows[0];

  return newUser;
}
