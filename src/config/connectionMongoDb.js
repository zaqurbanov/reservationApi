const mongoose = require('mongoose');

class Mongo{


    static connect = async(path)=>{

        try {
                console.log("Connecting...");

                await mongoose.connect(path)

                console.log("Connected !!!");
        } catch (error) {
           
            console.log("Connected Failed");
                console.log(error.message);
        }
        
    }
}

module.exports = Mongo