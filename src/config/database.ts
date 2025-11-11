import mongoose from "mongoose";
import { environment } from "./environment";

const connectDB = async (): Promise<void> => {
  const MONGODB_URI = environment.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
