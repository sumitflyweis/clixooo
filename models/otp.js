const mongoose = require('mongoose')

const otpSchema = mongoose.Schema(
    {
        phoneNumber:{type:Number,required:true},
        name:{type:String,required:true},
        otp:{type:String, required:true}
    }
)

module.exports = mongoose.model('otp', otpSchema)