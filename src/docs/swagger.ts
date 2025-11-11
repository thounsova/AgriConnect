import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My TypeScript API",
      version: "1.0.0",
      description: "API documentation example",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // files with Swagger comments
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
