const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Hospital Managment System API',
      version: '1.0.0',
    description: `API documentation for Smart Hospital Management System  📞 Phone: 0998890220`,    
    contact: {
      name: "Sophor Technologies",
      email: "info@sophortechnologies.com",
        }
    },

    servers: [
      {
        url: '/api/hms',
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

