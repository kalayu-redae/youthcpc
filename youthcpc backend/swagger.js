'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.3',

    info: {
      title: 'CPCT Youth Platform API',
      version: '1.0.0',
      description: 'REST API documentation for the CPCT Youth Platform.',
      contact: {
        name: 'CPCT Youth Platform',
        email: 'info@youthcpc.com'
      }
    },

    servers: [
      {
        url: '/api/youthcpc',
        description: 'Development Server'
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['./src/modules/**/*.routes.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: 'CPCT Youth Platform API Documentation'
    })
  );
};