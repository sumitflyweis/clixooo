const heroSchema = require('../../models/hero')
const userSchema= require('../../models/User')

module.exports.heroService = async(req,res)=>{
    try {
        const {name,price,rating} = req.body
      if(rating>=1  && rating<=5) {
        const name1 = await heroSchema.create({name,price,rating})
        if(name1){
            return res.status(200).json({msg:"category Added",data:name1})
        }else{
            return res.status(400).json({msg:"Failed to add service, please try again"})
        }
    }else{
        return res.status(400).json({msg:"rating is not in the range "})
    }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:error.message, name:error.name1})
        
    }
}



