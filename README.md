# MyHaulier Waitlist

> Early access signup site for the MyHaulier freight marketplace SaaS.

Modern, animated waitlist landing page with email capture and SQLite storage.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** — custom blue/dark theme
- **better-sqlite3** — lightweight local DB (swap to Postgres for production)
- **API route** — `POST /api/subscribe` for email capture

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Emails are stored in `data/waitlist.db` (SQLite). The file is git-ignored.

Schema:
```sql
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip TEXT
);
```

## Deployment

For production, replace `better-sqlite3` with a Postgres driver (e.g. `pg` or `@vercel/postgres`) and update `lib/db.ts`.

Deploy to Vercel with zero config:
```bash
vercel --prod
```

## API

### `POST /api/subscribe`

```json
{
  "email": "user@example.com",
  "name": "Optional Name",
  "company": "Optional Company"
}
```

**Responses:**
- `201` — Added to waitlist
- `400` — Invalid email
- `409` — Already on waitlist
- `500` — Server error

---

Built by [Simply Solutions](https://simplysolutions.dk)
