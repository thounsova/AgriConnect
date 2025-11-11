import swaggerJSDoc from 'swagger-jsdoc';

// Option 1: Let TypeScript infer the type
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Swagger documentation example',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./src/routes/*.ts'],
};

// Optionally create swaggerSpec here or in app.ts
export const swaggerSpec = swaggerJSDoc(swaggerOptions);
