import { pool } from "@/server/db/connection";

// FIND ADMIN BY EMAIL
export async function findAdminByEmail(email) {
  const { rows } = await pool.query(
    `
      SELECT
        id,
        email,
        password_hash AS "passwordHash"
      FROM public.admins
      WHERE email = $1
    `,
    [email]
  );

  return rows[0] ?? null;
}

// CREATE SESSION
export async function createSession({
  adminId,
  tokenHash,
  expiresAt,
}) {
  const { rows } = await pool.query(
    `
      INSERT INTO public.admin_sessions (
        admin_id,
        token_hash,
        expires_at
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        admin_id AS "adminId",
        expires_at AS "expiresAt"
    `,
    [adminId, tokenHash, expiresAt]
  );

  return rows[0];
}

// FIND VALID SESSION
export async function findValidSession(tokenHash) {
  const { rows } = await pool.query(
    `
      SELECT
        sessions.id,
        sessions.admin_id AS "adminId",
        sessions.expires_at AS "expiresAt",
        admins.email
      FROM public.admin_sessions AS sessions
      INNER JOIN public.admins AS admins
        ON admins.id = sessions.admin_id
      WHERE sessions.token_hash = $1
        AND sessions.expires_at > NOW()
    `,
    [tokenHash]
  );

  return rows[0] ?? null;
}

// DELETE SESSION
export async function deleteSession(tokenHash) {
  const { rowCount } = await pool.query(
    `
      DELETE FROM public.admin_sessions
      WHERE token_hash = $1
    `,
    [tokenHash]
  );

  return rowCount > 0;
}

// DELETE EXPIRED SESSIONS
export async function deleteExpiredSessions() {
  const { rowCount } = await pool.query(
    `
      DELETE FROM public.admin_sessions
      WHERE expires_at <= NOW()
    `
  );

  return rowCount;
}