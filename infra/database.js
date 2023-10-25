import pg from "pg";

const configurations = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

async function getClient() {
  const client = new pg.Pool(configurations);
  return await client.connect();
}

export async function query(query) {
  let client;

  try {
    client = await getClient();
    return await client.query(query);
  } catch (error) {
    console.error("Error while receive query: ", error);
  } finally {
    client.release();
  }
}
