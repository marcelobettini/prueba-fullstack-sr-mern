import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Opciones de configuración para Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de API - Prueba Técnica FullStack Disruptive Studio',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        username: { type: 'string', example: 'user123' },
                        email: { type: 'string', example: 'user@example.com' },
                        password: { type: 'string', example: 'password123' },
                        role: { type: 'string', enum: ['reader', 'creator', 'admin'], example: 'reader' },
                    },
                },
                Theme: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Nature' },
                        permissions: {
                            type: 'object',
                            properties: {
                                images: { type: 'boolean', example: true },
                                videos: { type: 'boolean', example: false },
                                texts: { type: 'boolean', example: true },
                            },
                        },
                    },
                },
                Category: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Photography' },
                        type: { type: 'string', enum: ['image', 'video', 'document'], example: 'image' },
                        coverImage: { type: 'string', example: 'http://example.com/cover.jpg' },
                    },
                },
                Content: {
                    type: 'object',
                    properties: {
                        title: { type: 'string', example: 'Sample Content' },
                        type: { type: 'string', enum: ['image', 'video', 'text'], example: 'image' },
                        url: { type: 'string', example: 'http://example.com/image.jpg' },
                        theme: { type: 'string', example: '60d21b4667d0d8992e610c85' },
                        category: { type: 'string', example: '60d21b4667d0d8992e610c84' },
                        author: { type: 'string', example: '60d21b4667d0d8992e610c83' },
                        credits: { type: 'string', example: 'username' },
                    },
                },
            },
        },
        servers: [
            { url: 'http://localhost:3000/api/v1', description: 'Servidor de desarrollo' },
        ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

// Inicializar Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
