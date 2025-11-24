import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// ✅ Use alias from tsconfig paths
import connectDB from "@/config/database";
import { swaggerOptions } from "@/swagger";
import categoryRoute from "@/routes/categoryRoute";
import authRoute from "@/routes/authRoutes";
import assignRoute from "@/routes/assginRole";
import farmerRoute from "@/routes/farmerRoute";
import productRoute from "@/routes/productRoute";
import userRoute from "@/routes/userRoute";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Agriconnect API");
});
app.use("/api", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/admin", assignRoute);
app.use("/api", farmerRoute);
app.use("/api/product", productRoute);
app.use("/api", userRoute);

// Function to connect DB once
let isDBConnected = false;
async function initDB() {
  if (!isDBConnected) {
    await connectDB();
    console.log("✅ Database connected");
    isDBConnected = true;
  }
}

// Local server (for development)
if (process.env.NODE_ENV !== "production") {
  initDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
      });
    })
    .catch((err) => {
      console.error("❌ Database connection failed:", err);
      process.exit(1);
    });
}

// Export for Vercel serverless
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await initDB();
    app(req, res);
  } catch (err) {
    console.error("❌ Serverless handler error:", err);
    res.status(500).send("Internal Server Error");
  }
}
