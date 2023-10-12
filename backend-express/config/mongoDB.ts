import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let mongooseConnection = mongoose.connect(process.env.MONGODB_URI!);

export default mongooseConnection;
