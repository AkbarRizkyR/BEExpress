const express = require('express');
const routes = require('./routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const responseMiddleware = require('./middlewares/response.middlewares');

const app = express();
app.use(express.json());
app.use(responseMiddleware);

// Swagger config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Customer API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
            schemas: {
                Customer: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        total_hutang: { type: 'number' },
                        total_pesanan: { type: 'integer' },
                        total_bayar: { type: 'number' },
                        kilo_pesanan: { type: 'number' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    }
                },
                CreateCustomerDTO: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string' },
                        total_hutang: { type: 'number' },
                        total_pesanan: { type: 'integer' },
                        total_bayar: { type: 'number' },
                        kilo_pesanan: { type: 'number' },
                    }
                },
                UpdateCustomerDTO: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string' },
                        total_hutang: { type: 'number' },
                        total_pesanan: { type: 'integer' },
                        total_bayar: { type: 'number' },
                        kilo_pesanan: { type: 'number' },
                    }
                }
            }
        }
    },
    apis: ['./src/resource/*.js'], // paths to files containing Swagger annotations
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register all routes
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
