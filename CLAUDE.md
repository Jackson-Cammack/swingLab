# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SwingLab is a video analysis app for golf coaches and players — swing analysis, video feedback, progress tracking, and coaching tools. The project is early-stage: the backend has one working resource (`Golfer`) with full CRUD, and the frontend is still the unmodified Vite + React scaffold (no real UI built yet).

The repo is a two-package monorepo with no root-level build tooling — `client` and `server` are independent Node projects, each with their own `package.json` and `node_modules`, run separately.

## Commands

All commands are run from inside `client/` or `server/` respectively — there is no root package.json.

**Server** (`server/`):
- `npm run dev` — start the API with nodemon (auto-restart on change)
- `npm start` — start the API with plain node
- No test suite or lint script is configured yet.

**Client** (`client/`):
- `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run oxlint
- No test suite is configured yet.

## Architecture

**Server** — Express 5 + Mongoose, ESM (`"type": "module"`), layered MVC:
- `server.js` — app entry point; loads env, wires middleware, mounts routers, calls `connectDB()` then starts listening.
- `config/db.js` — Mongoose connection using `MONGO_URI` from env; exits the process on connection failure.
- `models/` — Mongoose schemas (e.g. `Golfer.js`).
- `controllers/` — request handlers per resource, each exported function does its own try/catch and shapes the HTTP response directly (no shared error-handling middleware yet).
- `routes/` — Express routers that map REST verbs to controller functions, mounted under `/api/<resource>` in `server.js` (e.g. `/api/golfers`).

When adding a new resource, follow the existing golfer pattern: schema in `models/`, handlers in `controllers/`, router in `routes/`, then mount it in `server.js`.

**Client** — React 19 + Vite, plain JS/JSX (no TypeScript), oxlint for linting. Currently just the Vite template shell (`App.jsx`, `main.jsx`) — no routing, state management, or API integration layer has been established yet, so there's no existing convention to follow for those; check with the user on structure before introducing one.

## Environment

Each package has its own `.env` (gitignored): `server/.env` needs `PORT` and `MONGO_URI`; `client/.env` is currently empty. Never commit real values from these files.
