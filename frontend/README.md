# StreamCraft Frontend

Vite + React + Tailwind CSS client for the StreamCraft video platform.

## Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173` and expects the backend at `http://localhost:8000/api/v1`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Architecture

```
src/
├── components/   # Shared UI, layout, common guards
├── features/     # Domain modules (auth, videos, comments, …)
├── pages/        # Route-level screens
├── services/     # Axios client + API modules
├── hooks/        # Shared hooks
├── utils/        # Helpers & constants
└── routes/       # React Router config
```

Original HTML design mockups live in `design-refs/` for reference only.
