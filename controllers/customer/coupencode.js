const coupenSchema= require('../../models/coupencode')
//const otpSchema = require('../../models/otp')
const moment = require('moment')        



module.exports.getcoupencodecustomer = async(req,res)=>{
    try {

       
        const allcoupens= await coupenSchema.find()
        console.log(allcoupens)
        if(allcoupens){

            return res.status(200).json(allcoupens)
        }else{
            return res.status(400).json({msg:"No coupens added",data:allcoupens})
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}