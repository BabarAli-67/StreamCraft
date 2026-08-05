import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js"
import { ApiResponse } from "./utils/ApiResponse.js"

const app = express()

// CORS: set CORS_ORIGIN to your Vercel URL (e.g. https://streamcraft.vercel.app),
// a comma-separated list, or * for temporary open testing.
// With credentials, * is handled by reflecting the request Origin (browsers reject Access-Control-Allow-Origin: * + credentials).
const corsOriginEnv = process.env.CORS_ORIGIN?.trim()
const allowedOrigins =
    !corsOriginEnv || corsOriginEnv === "*"
        ? null
        : corsOriginEnv.split(",").map((o) => o.trim()).filter(Boolean)

app.use(
    cors({
        origin: (origin, callback) => {
            // Non-browser clients (Postman, server-to-server) often send no Origin
            if (!origin) {
                return callback(null, true)
            }
            // Temporary * / unset: allow any origin (reflected for credentials)
            if (!allowedOrigins) {
                return callback(null, true)
            }
            if (allowedOrigins.includes(origin)) {
                return callback(null, true)
            }
            return callback(new Error(`Not allowed by CORS: ${origin}`))
        },
        credentials: true,
    })
)

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

const mountApiRoutes = (basePath = "") => {
    const base = basePath.replace(/\/$/, "")
    app.use(`${base}/healthcheck`, healthcheckRouter)
    app.use(`${base}/users`, userRouter)
    app.use(`${base}/tweets`, tweetRouter)
    app.use(`${base}/subscriptions`, subscriptionRouter)
    app.use(`${base}/videos`, videoRouter)
    app.use(`${base}/comments`, commentRouter)
    app.use(`${base}/likes`, likeRouter)
    app.use(`${base}/playlist`, playlistRouter)
    app.use(`${base}/dashboard`, dashboardRouter)
}

// Canonical API prefix
mountApiRoutes("/api/v1")
// Some hosts/rewrites strip /api/v1 before Express — keep login etc. working
mountApiRoutes("")


app.use((req, res) => {
    return res
        .status(404)
        .json(new ApiResponse(404, null, `Route ${req.originalUrl} not found`))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    if (!(err instanceof ApiError)) {
        console.error(err)
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        data: null
    })
})

export { app }
export default app
