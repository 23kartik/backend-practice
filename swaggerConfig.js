const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your Contact API',
    },
  },
  apis: ['./routes/contactRoutes.js', './routes/userRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
