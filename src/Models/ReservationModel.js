const mongoose = require('mongoose')


const ReservationSchema = new mongoose.Schema({
        venueId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Venues',
            required:true
            
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        date:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        numberOfPeople:{
            type:Number,
            required:true
           
        }
})


module.exports = mongoose.model("Reservation",ReservationSchema)