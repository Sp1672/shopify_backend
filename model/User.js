const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    passwor:{
        type:String,
        required:true,
    },
    roll:{
        type:String,
        default:'user'
    },
    token:{
        type:String,
        required:true
    }
})

const User=mongoose.model('User',userSchema);

module.exports={User};