import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

// Hosts (Render, Railway, etc.) inject PORT — must use process.env.PORT
const PORT = Number(process.env.PORT) || 8000

connectDB()
.then(() => {
    const server = app.listen(PORT, () => {
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
    console.log("MongoDB connection failed:", err);
})
