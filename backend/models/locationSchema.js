const mongoose=require('mongoose');

const locationSchema=mongoose.Schema({
    bookedSlots:{
        type:Array
    },
    locationName:{
        type:String,
        unique:true
    }
})

module.exports=locationSchema