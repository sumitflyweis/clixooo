const userSchema= require('../../models/User')
const otpSchema = require('../../models/otp')
const jwt = require('jsonwebtoken')
const isValidDate = function (value) {
    if (/^(18|19|20)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value))
     return true;
    return false;
  };

module.exports.register = async(req,res)=>{

    try {
        const {name,phoneNumber,role,gender,email,birth,city,website,ishero,status} = req.body

        if(!(name && phoneNumber)){
            return res.status(400).json({msg:"Fields are required"})
        }

        const otp = Math.floor((Math.random()*10000)+1)
        console.log(otp)
        const user = await userSchema.create({
            name,phoneNumber,otp ,role,gender,email,birth,city,website,ishero,status
        })
     console.log(user)

        if(user){
            const token = jwt.sign({_id:user._id}, process.env.KEY, {expiresIn:'1d'})
           // console.log(token)
            res.setHeader('Authorization', 'Bearer '+ token)
          //let data =user.name,
            return res.status(200).json({msg:"otp has been sent to your number",name,phoneNumber,otp})
        }else{
            return res.status(400).json({msg:"Something went wrong, try again"})
        }
        
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
    }
}

module.exports.verifySignIn=async(req,res)=>{
    try {
        const {name,phoneNumber,otp} = req.body

        const verifyOtp = await userSchema.findOne({name:name,phoneNumber:phoneNumber,otp:otp})

        if(verifyOtp){
            return res.status(200).json({msg:"signIn successfull",data:verifyOtp})
        }else{
            const user = await userSchema.create({name,phoneNumber,otp})
            if(user){
               // return res.status(200).json({msg:"signIn successfull",data:user})
            }else{
                return res.status(400).json({msg:"unable to sign you in, please try again"})
            }
        }
        // }else{
        //     return res.status(400).json({msg:"creadetials not matched"})
        // }

    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}






module.exports.updateUser = async(req,res)=>{

    try {
        
          const {name,phoneNumber,gender,email,birth,city,website,_id,status} = req.body
       
            const user = await userSchema.findOneAndUpdate({_id:_id},{
            $set:{
                name,status
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







