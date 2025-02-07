const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'PiFinance API',
            version: '1.0.0',
            description: 'API documentation for the PiFinance platform, providing access to financial services using Pi coins.',
            contact: {
                name: 'PiFinance Team',
                url: 'https://pifinance.example.com',
                email: 'support@pifinance.example.com',
            },
            servers: [
                {
                    url: 'http://localhost:5000/api', // Base URL for the API
                },
            ],
        },
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
    apis: ['./src/api/routes/*.js'], // Path to the API docs
};

// Initialize Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Function to set up Swagger UI
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = {
    setupSwagger,
};
