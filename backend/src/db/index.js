import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

/**
 * Returns a clean Atlas URI with no database path segment.
 * Query params like `?retryWrites=true&w=majority` are preserved.
 * Database selection is handled via mongoose `dbName` (avoids
 * `majority/streamcraft` and `streamcraft/streamcraft` bugs).
 */
const sanitizeMongoUri = (uri) => {
    const trimmed = (uri || "").trim();
    if (!trimmed) return trimmed;

    const [withoutQuery, query = ""] = trimmed.split("?");
    const originMatch = withoutQuery.match(/^(mongodb(?:\+srv)?:\/\/[^/]+)/i);
    const origin = originMatch ? originMatch[1] : withoutQuery.replace(/\/$/, "");

    return query ? `${origin}/?${query}` : `${origin}/`;
};

const connectDB = async () => {
    try {
        const uri = sanitizeMongoUri(process.env.MONGODB_URI);
        const connectionInstance = await mongoose.connect(uri, {
            dbName: DB_NAME,
        });
        console.log(
            `MongoDB connected — host: ${connectionInstance.connection.host} | db: ${connectionInstance.connection.name}`
        );
    } catch (error) {
        console.log("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
