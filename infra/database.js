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
  await client.connect();
  return client;
}

export async function query(query) {
  try {
    const client = await getClient();
    const results = await client.query(query);
    return results;
  } catch (error) {
    console.error("Error while receive query: ", error);
  }
}
