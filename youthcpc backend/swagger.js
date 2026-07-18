const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Youth CPC API Documentation',
      version: '1.0.0',
      description: `API documentation for Youth CPC platform  📞 Phone: 0943662611`,
      contact: {
        name: "youthcpc",
        email: "info@youthcpc.com",
      }
    },

    servers: [
      {
        url: '/api/youthcpc',
        description: 'Live API Server (Relative Path)',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/modules/**/*.routes.js']
  // apis: ['./routes/**/*.js'], // all route files
};

module.exports = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve, (req, res) => {
      const swaggerSpec = swaggerJSDoc(options); // regenerate on each request
      swaggerUi.setup(swaggerSpec)(req, res);
    });
};

