import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js'
import { ensureDemoData } from "./utils/ensureDemoData.js"

// Local: loads backend/.env. On Render, dashboard env vars are already in process.env.
dotenv.config()

// Hosts (Render, Railway, etc.) inject PORT — must use process.env.PORT
const PORT = Number(process.env.PORT) || 8000

connectDB()
.then(async () => {
    // Populate published demo videos when DB is empty (safe for first deploy)
    if (process.env.SEED_ON_EMPTY !== "false") {
        await ensureDemoData()
    }

    const server = app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server on port ${PORT}`)
    })

    server.on("error", (err) => {
        if (err?.code === "EADDRINUSE") {
            console.error(
                `Port ${PORT} is already in use. Stop the other process (Ctrl+C in that terminal) or run:\n` +
                `  Get-NetTCPConnection -LocalPort ${PORT} | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }`
            )
            process.exit(1)
        }
        throw err
    })
})
.catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1)
})
