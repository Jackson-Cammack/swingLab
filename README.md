# SwingLab

A MERN-stack golf swing tracking app. Backend and frontend are separate projects.

## Structure

- `server/` — Express + Mongoose API
- `client/` — React app (Vite)

## Backend

```
cd server
cp .env.example .env   # fill in MONGO_URI
npm install
npm run dev
```

Runs on `http://localhost:5000`. Health check: `GET /api/health`.

## Frontend

```
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`.
