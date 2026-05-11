## ApplyPort-SV

Next.js full-stack project where frontend and backend both live in the same app.

## Setup

1. Install dependencies:
   - `npm install`
2. Create environment file:
   - Copy `.env.example` to `.env.local`
3. Add your values in `.env.local`:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `JWT_SECRET`
   - `ADMIN_EMAILS` (comma-separated admin emails for role guard)
   - `ADMIN_SEED_NAME`
   - `ADMIN_SEED_EMAIL`
   - `ADMIN_SEED_PASSWORD`
4. Start dev server:
   - `npm run dev`
5. Seed admin user:
   - `npm run seed:admin`

## Backend Modules Added

- Auth APIs:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
  - `POST /api/auth/logout`
- Programs API:
  - `GET /api/programs`
- Applications APIs:
  - `GET /api/applications`
  - `POST /api/applications`
  - `GET /api/applications/:id`
  - `PATCH /api/applications/:id`
- Admin APIs (protected):
  - `GET /api/admin/applications`
  - `PATCH /api/admin/applications/:id`

## Notes

- Register/Login forms now call backend APIs.
- Application wizard now submits to backend.
- Student/Admin application views can read data from MongoDB and fallback to demo data if DB is unavailable.
- `/admin` routes are protected with server-side role guard.
- `npm run seed:admin` creates/updates an admin user directly in MongoDB.
