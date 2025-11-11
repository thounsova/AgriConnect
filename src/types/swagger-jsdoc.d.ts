// src/types/swagger-jsdoc.d.ts
declare module 'swagger-jsdoc' {
  import { OpenAPIV3 } from 'openapi-types';

  interface SwaggerJSDocOptions {
    swaggerDefinition: OpenAPIV3.Document;
    apis: string[];
  }

  function swaggerJSDoc(options: SwaggerJSDocOptions): OpenAPIV3.Document;

  export = swaggerJSDoc;
}
