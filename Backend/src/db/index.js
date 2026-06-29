import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
        serverSelectionTimeoutMS: 4000
       });
       console.log(` \n MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("\n 🔥 === DATABASE CRITICAL ERROR ===");
        if (error.name==="MongoServerSelectionError") {
            console.error("Error Type: Cloud Database Unreachable");
            console.error("Action Required: Please check your Internet Connection or MongoDB Atlas IP Whitelisting (0.0.0.0/0)!");
        }
        else {
            console.error(`Unexpected DB Failure: ${error.message}`);
        }
        console.error("===================================\n");
        process.exit(1)
    }
}
export default connectDB