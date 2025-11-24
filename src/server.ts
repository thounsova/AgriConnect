import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

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

const PORT = process.env.PORT || 5000;
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("✅ Database connected");

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

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
