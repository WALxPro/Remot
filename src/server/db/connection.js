import { Pool } from "pg";

function createPool() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error.message);
  });

  return pool;
}

const pool = globalThis.postgresPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.postgresPool = pool;
}

export { pool };