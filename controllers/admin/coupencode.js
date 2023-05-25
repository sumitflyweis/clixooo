const coupenSchema= require('../../models/coupencode')
//const otpSchema = require('../../models/otp')
const moment = require('moment')

//const jwt = require('jsonwebtoken')


  module.exports.coupencodeService = async(req,res)=>{
    try{
      let {coupencode, minimumAmount,activationdate, expirydate} = req.body;
       if(!coupencode/* ||!minimumAmount ||!activationDate ||!expiryDate*/)
        return res.status(400).json({
          success: false,msg:"some fields are missing"})

      const coupencodeId=await coupenSchema.findOne({coupencode:coupencode})
     console.log(coupencodeId);
    if(!coupencodeId){
        const b =   moment(activationdate);
        var d = moment(expirydate);
        const Coupencreated = await coupenSchema.create({coupencode:coupencode, minimumAmount:minimumAmount, activationdate:b, expirydate:d})
        return res.status(201).json({success:true,coupen:Coupencreated})
       
    }
    else if(coupencodeId.coupencode==coupencode){
        return res.status(400).json({msg:"coupen already present"})}

    }
    catch (error) {
                    return res.status(400).json({msg:error.message, name:error.name})
         }
        }


        
module.exports.getcoupencode = async(req,res)=>{
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

module.exports.updatecoupencodeService = async(req,res)=>{

    try {
           let  {minimumAmount,_id}=req.body
             const user = await coupenSchema.findOneAndUpdate({_id:_id},{
            $set:{
               minimumAmount,
             
            }
        },{new:true})

        if(user){
            return res.status(200).json({msg:"profile details updated",data:user})
        }else{
            return res.status(400).json({msg:"something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
    }
}
exports.deletecoupencodeService = async(req,res) => {
    try {
    const id = req.params.id; 
    await coupenSchema.deleteOne({_id: id});
    res.status(200).send({message: "coupen deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}
