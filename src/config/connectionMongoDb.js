const mongoose = require('mongoose');
const logger = require('../logger/logger');

class Mongo{


    static connect = async(path)=>{

        try {
                console.log("Connecting...");

                await mongoose.connect(path)

                console.log("Connected !!!");
        } catch (error) {
            logger.error(error.message)
            console.log("Connected Failed");
                console.log(error.message);
        }
        
    }
}

module.exports = Mongo