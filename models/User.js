const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String},
    phoneNumber:{type:Number, unique:true},
    role: [{ type: String, default: ['user'] }],
    gender:{type:String},
    email:{type:String},
    birth:{type:Date},
    city:{type:String},
    age:{type:String},
    Rating:{type:String},
    Avatar:{type:String},
    website:{type:String},     
    ishero:{type:Boolean,default:false},  
    status:{type:String,default:"yes",enum:["yes","no"]},
    otp:{
        type:String
    },
    block:{type:Boolean,default:false},
    wallet:{type:Number},
    rating:{type:Number},
    message:[{type:String}],
    Date:{type:Date,default:new Date()},
    data:{type:Object},
    profile:{
        type:String
    }
},{
    timestamps:true 
})

module.exports = mongoose.model('user',userSchema)
