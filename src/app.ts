import express from 'express';
import farmRoutes from './routes/farm';
import { setupSwagger } from './swagger';

const app = express();

app.use(express.json());
app.use(farmRoutes);

// Swagger
setupSwagger(app);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/api-docs');
});
