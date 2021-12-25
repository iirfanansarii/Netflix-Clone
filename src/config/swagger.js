const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    swagger: '2.0',
    info: {
      title: 'Netflix Clone',
      description: 'Netflix Clone APIs Documentation',
      version: 1.0,
      contact: {
        name: 'Developer',
      },
      servers: ['http://localhost:5000/'],
      basePath: '', // not in use
    },
  }),
  apis: ['src/app.js', 'src/routes/*.js'],
};

module.exports = swaggerOption;
