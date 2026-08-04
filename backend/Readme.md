# StreamCraft Backend

REST API for StreamCraft — a video streaming platform with authentication, media uploads, social features, and channel analytics.

## Architecture

```
backend/
├── src/
│   ├── index.js              # App entry — loads env, connects DB, starts server
│   ├── app.js                # Express app, middleware, route mounting
│   ├── constants.js          # Shared constants (e.g. DB name)
│   ├── db/                   # MongoDB connection
│   ├── models/               # Mongoose schemas
│   ├── controllers/          # Request handlers
│   ├── routes/               # API route definitions
│   ├── middlewares/          # Auth (JWT) and file upload (Multer)
│   └── utils/                # ApiError, ApiResponse, asyncHandler, Cloudinary
└── public/                   # Static assets / temp upload storage
```

All routes are versioned under `/api/v1/*`. Controllers use a shared `asyncHandler` wrapper; errors are thrown as `ApiError` and success payloads use `ApiResponse`.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (ES modules) |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (access + refresh tokens), bcrypt |
| Media | Multer (local temp) → Cloudinary |
| Cross-origin | CORS + cookie-parser |
| Dev tooling | Nodemon, Prettier |

## API Modules

| Module | Base path | Description |
|--------|-----------|-------------|
| Healthcheck | `/api/v1/healthcheck` | Service health status |
| Users | `/api/v1/users` | Register, login, profile, avatar/cover, watch history |
| Videos | `/api/v1/videos` | Upload, list, update, delete, publish toggle |
| Comments | `/api/v1/comments` | CRUD comments on videos |
| Likes | `/api/v1/likes` | Like/unlike videos, comments, tweets |
| Tweets | `/api/v1/tweets` | Short text posts |
| Subscriptions | `/api/v1/subscriptions` | Subscribe/unsubscribe, subscriber lists |
| Playlists | `/api/v1/playlist` | Create playlists, add/remove videos |
| Dashboard | `/api/v1/dashboard` | Channel stats and video overview |

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for media uploads)

### Installation

```bash
cd backend
npm install
cp .env.sample .env
# Edit .env with your credentials (see checklist below)
npm run dev
```

Server defaults to `http://localhost:8000`.

### Environment Variables

Copy `.env.sample` to `.env` and fill in all values. Required keys:

- `PORT`, `MONGODB_URI`, `CORS_ORIGIN`
- `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRY`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### Third-Party Setup Checklist

1. **MongoDB Atlas** — Create a cluster, database user, and network access rule; copy the connection URI into `MONGODB_URI` (without the database name suffix; the app appends `DB_NAME`).
2. **Cloudinary** — Create a free account, open Dashboard → API Keys, and set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
3. **JWT secrets** — Generate strong random strings for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` (do not use the sample placeholders).
4. **CORS** — Set `CORS_ORIGIN` to your frontend origin (e.g. `http://localhost:5173`) instead of `*` when using credentials/cookies.
