const bookings = require('../../models/Bookings')
const userSchema= require('../../models/User')
const heroSchema = require('../../models/hero')
const categorySchema = require('../../models/category')
const serviceSchema = require('../../models/services')


module.exports.getbooking = async(req,res)=>{
    try {
        const booking=req.body
      
      const services= await bookings.find()
        console.log(services)
        if(services){

            return res.status(200).json(services)
        }else{
            return res.status(400).json({msg:"No services added",data:services})
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}



module.exports.updatebook = async(req,res)=>{

    try {
        let {update}=req.params

        if(!update || update.length<24)return res.status(400).json("invalid userid")
        const user1 = await bookings.findOne({update})
        console.log(user1)
       
         if(user1.booked==true && user1.cancellable==false){
      
            user1.booked=false
         }
        console.log(user1.booked)

        const user = await bookings.findOneAndUpdate(update,user1,{new:true})
        console.log(user)
        return res.status(200).json(user)
      
}
  catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
    }
}


