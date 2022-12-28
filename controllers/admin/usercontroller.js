const userSchema= require('../../models/User')
const otpSchema = require('../../models/otp')
const jwt = require('jsonwebtoken')

module.exports.getUser = async(req,res)=>{

        try {
           
            const user = await userSchema.find()
    
          
                return res.status(200).json({msg:"profile details updated",data:user})
           
        } catch (error) {
            return res.status(400).json({msg:error.message, name:error.name})
        }
    }









