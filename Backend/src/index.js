import "dotenv/config"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




// ;(async () => {
//   try {
//    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//   } catch (error) {
//     console.error("Error: ", error)
//     throw error
//   }
// })();
