const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailAddress:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    photo:{
        type:String
    }
})

module.exports=userSchema