import "dotenv/config"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

connectDB()





// ;(async () => {
//   try {
//    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//   } catch (error) {
//     console.error("Error: ", error)
//     throw error
//   }
// })();
