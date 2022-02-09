const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema({
    userId:{
        type:String,
        unique:true
    },
    location:{
        type:Array,
    },
    fromTime:{
        type:Array,
    },
    toTime:{
        type:Array,
    },
    date:{
        type:Array
    },
    vehicle:{
        type:Array
    },
    bookings:{
        type:Array
    }
})

module.exports=bookingSchema