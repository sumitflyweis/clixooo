const heroSchema = require('../../models/hero')
const userSchema= require('../../models/User')





module.exports.gethero = async(req,res)=>{
    try {
        const name=req.body
     
      const services= await heroSchema.find(name)
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


module.exports.gethero1 = async(req,res)=>{
    try {
        const price=req.body
     
      const services= await heroSchema.find({category:price})
       
        if(services){

            return res.status(200).json(services)
        }else{
            return res.status(400).json({msg:"No services added",data:services})
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}


module.exports.getherorole = async(req,res)=>{
    try {
        
     
      const services= await heroSchema.find()
        console.log(services)
        const services1=await userSchema.find({role:"hero"})
        console.log(services1)
        

         return res.status(200).json({services,services1})
        
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}