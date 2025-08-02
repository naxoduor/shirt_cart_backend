// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
        url: "http://64.23.199.26:8082/", // Replace with your actual base URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Point to your route files with Swagger comments
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
