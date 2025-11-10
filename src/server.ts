import express from "express";
import connectDB from "@/config/database";
import Router from "@/routes/index";
import "@/models/bookModel"; // in server.ts or cartService.ts

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);

connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
