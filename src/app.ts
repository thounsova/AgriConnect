import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';

import { swaggerOptions } from '@/swagger';
import userRoutes from '@/routes/userRoutes';


const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS


// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', userRoutes);

export default app;
