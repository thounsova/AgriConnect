import express from "express";
import connectDB from "@/config/database";

import userRouter from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);

connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
