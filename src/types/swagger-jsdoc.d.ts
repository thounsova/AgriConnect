// Declare the module for swagger-jsdoc
declare module 'swagger-jsdoc' {
  import { Options } from 'swagger-jsdoc';
  const swaggerJSDoc: (options: Options) => any;
  export = swaggerJSDoc;

  export type SwaggerOptions = Options;
}
