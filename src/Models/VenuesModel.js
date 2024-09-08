const mongoose = require('mongoose')


const VenuesSchema = new mongoose.Schema({
        name:{
            type:String,
            unique:true,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        capacity:{
            type:String,
            required:true
        },
        description:{
            type:String,
           
        }
})


module.exports = mongoose.model("Venues",VenuesSchema)