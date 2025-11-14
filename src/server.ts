import connectDB from '@/config/database';
import cors from 'cors';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from '@/swagger';
import authRoute from '@/routes/authRoutes';
import userRoute from '@/routes/userRoute';

const PORT = process.env.PORT || 3000;
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

connectDB()

  .then(() => {
    console.log('Database connected');

    // Swagger setup
    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Routes
    app.use('/api', authRoute);
    app.use('/api', userRoute);

    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  })



  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
