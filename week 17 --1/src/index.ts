import "dotenv/config";
import { Client } from "pg";

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await pgClient.connect();

  console.log("Connected to database");

  await pgClient.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    );
  `);

  console.log("Todos table created");

  await pgClient.end();
}

main();