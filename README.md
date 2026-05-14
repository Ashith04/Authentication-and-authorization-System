# Authentication & Authorization Assignment

This project implements a simple backend for a learning platform with secure authentication and role-based authorization.

Stack: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

Quick start

1. Install dependencies

```bash
npm install
```

2. Create `.env` in the project root (use `.env.example`)

3. Start server (development)

```bash
npm run dev
```

API Endpoints

- `POST /api/auth/register` — register user (body: `name`, `email`, `password`, optional `role`)
- `POST /api/auth/login` — login (body: `email`, `password`) → returns token
- `GET /api/users` — admin only: list users
- `GET /api/users/:id` — owner or admin
- `PUT /api/users/:id` — update (owner or admin)
- `DELETE /api/users/:id` — admin only

Notes

- Passwords are hashed with `bcryptjs`.
- JWTs are signed with `JWT_SECRET` and expire in 1 hour.
- Keep `.env` secrets out of version control.

If you want, I can also add a small Postman collection or a seed script to create an initial admin user.
