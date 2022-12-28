const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    phoneNumber:{type:Number,required:true, unique:true},
    role:[{type:String,default:'user'}],
    gender:{type:String},
    email:{type:String},
    birth:{type:Date},
    city:{type:String},
    age:{type:String},
    Rating:{type:String},
    website:{type:String},     
    ishero:{type:Boolean,default:false},  
    status:{type:String,default:"pending",enum:["pending","complete","rejected"]},
    otp:{
        type:String
    },
    block:{type:Boolean,default:false}
})

module.exports = mongoose.model('user',userSchema)