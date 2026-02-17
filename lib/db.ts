import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "waitlist.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        company TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip TEXT
      );
    `);
  }
  return db;
}

export function addToWaitlist(
  email: string,
  name?: string,
  company?: string,
  ip?: string
): { success: boolean; alreadyExists?: boolean; error?: string } {
  try {
    const database = getDb();
    const stmt = database.prepare(
      "INSERT INTO waitlist (email, name, company, ip) VALUES (?, ?, ?, ?)"
    );
    stmt.run(email, name || null, company || null, ip || null);
    return { success: true };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { success: false, alreadyExists: true };
    }
    return { success: false, error: error.message || "Unknown error" };
  }
}

export function getWaitlistCount(): number {
  const database = getDb();
  const row = database.prepare("SELECT COUNT(*) as count FROM waitlist").get() as { count: number };
  return row.count;
}
