const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path'); 

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Reservation API",
            version: "1.0.0",
            description: 'API Documentation for Reservation and Venue system     // email:admin@gmail.com password:Admin@123 username:admin"'
        },
        servers: [
            { url: 'http://localhost:3755/api' },
        ],
    },
    apis: [path.join(__dirname, '../Routers/*.js')] 
};

const swaggerJsDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerJsDocs;
