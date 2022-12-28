const customer_to_hero = require('../../models/customer-to-hero')
const userSchema= require('../../models/User');



module.exports.update_customer_to_hero = async(req,res)=>{

    try {
         const id =req.params.id
          console.log(id)
    
            const user = await userSchema.findOneAndUpdate(id,
                { $push: { role:"hero"}   }
        ,{new:true})

        if(user){
            return res.status(200).json({msg:"profile details updated",data:user})
        }else{
            return res.status(400).json({msg:"something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
    }
}


