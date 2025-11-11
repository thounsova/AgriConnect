import app from '@/app';
import connectDB from '@/config/database';

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log('Database connected');

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
