const express = require('express');
const Mongo = require('./config/connectionMongoDb');
const { MONGO_PATH, PORT } = require('./config/env');

const app = express()
const routes = require('./Routers/routes');
const HTTP_CODE = require('./config/HTTP_CODE');
const messages = require('./config/messages');
const notFound = require('./middlewares/notFound');
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./config/swagger.js')


Mongo.connect(MONGO_PATH)
app.use(express.json({ 
    strict: true, 
   
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf); 
        } catch (err) {
            res.status(400).json({
                    statusCode:HTTP_CODE.client_error.bad_request,
                success: false,
                message: messages.jsonError,
                error:err.message
            }); 
        }
    } 
})); 

app.use('/api',routes)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
app.use('*',notFound)




app.listen(PORT,()=>{
    console.log(`Server Listening on port ${PORT}`);
}) 