// swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://64.23.199.26:8082/",
      },
    ],
  },
  apis: ["./routes/*.js"], // adjust as needed
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };


