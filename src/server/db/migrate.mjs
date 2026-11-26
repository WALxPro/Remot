import pg from "pg";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { Client } = pg;

const MIGRATIONS_DIR = fileURLToPath(
  new URL("./migrations/", import.meta.url)
);

const MIGRATION_LOCK_ID = 824601;

async function migrate() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();

    console.log("Database connected successfully.");

    // Prevent concurrent migration execution.
    await client.query(
      "SELECT pg_advisory_lock($1)",
      [MIGRATION_LOCK_ID]
    );

    // Track executed migrations.
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.schema_migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      ALTER TABLE public.schema_migrations
      ENABLE ROW LEVEL SECURITY;
    `);

    const files = (await readdir(MIGRATIONS_DIR))
      .filter((file) => file.endsWith(".sql"))
      .sort();

    const { rows } = await client.query(`
      SELECT filename
      FROM public.schema_migrations
    `);

    const executedMigrations = new Set(
      rows.map((row) => row.filename)
    );

    for (const filename of files) {
      if (executedMigrations.has(filename)) {
        console.log(`Skipped: ${filename}`);
        continue;
      }

      const sql = await readFile(
        path.join(MIGRATIONS_DIR, filename),
        "utf8"
      );

      try {
        await client.query("BEGIN");

        await client.query(sql);

        await client.query(
          `
            INSERT INTO public.schema_migrations (filename)
            VALUES ($1)
          `,
          [filename]
        );

        await client.query("COMMIT");

        console.log(`Executed: ${filename}`);
      } catch (error) {
        await client.query("ROLLBACK");

        throw new Error(
          `Migration failed: ${filename}`,
          { cause: error }
        );
      }
    }

    console.log("All migrations completed successfully.");
  } finally {
    await client.end();
  }
}

migrate().catch((error) => {
  console.error("Migration error:", error);
  process.exitCode = 1;
});