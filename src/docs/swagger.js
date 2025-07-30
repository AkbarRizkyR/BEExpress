const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
        },
    },
    apis: ['./src/resource/*.js'], // path ke file route Anda
};

const specs = swaggerJsdoc(options);

// Ekspor sebagai fungsi yang menerima app Express
module.exports = function setupSwagger(app) {
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );
};