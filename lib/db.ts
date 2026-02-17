import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
  return neon(url);
}

export async function ensureTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      company TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      ip TEXT
    )
  `;
}

export async function addToWaitlist(
  email: string,
  name?: string,
  company?: string,
  ip?: string
): Promise<{ success: boolean; alreadyExists?: boolean; error?: string }> {
  try {
    const sql = getSql();
    await ensureTable();
    await sql`
      INSERT INTO waitlist (email, name, company, ip)
      VALUES (${email}, ${name ?? null}, ${company ?? null}, ${ip ?? null})
    `;
    return { success: true };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    // Postgres unique violation code
    if (error.code === "23505") {
      return { success: false, alreadyExists: true };
    }
    return { success: false, error: error.message ?? "Unknown error" };
  }
}

export async function getWaitlistCount(): Promise<number> {
  const sql = getSql();
  await ensureTable();
  const rows = await sql`SELECT COUNT(*)::int AS count FROM waitlist`;
  return rows[0].count as number;
}
