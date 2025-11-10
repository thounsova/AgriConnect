import mongoose from "mongoose";
import { environment } from "./environment";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  const MONGODB_URI = environment.MONGODB_URI;
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
