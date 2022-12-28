const serviceSchema = require('../../models/services')


module.exports.addService = async(req,res)=>{
    try {
        const {name} = req.body
      
        
        const service = await serviceSchema.create({name})
          
        if(service){
            return res.status(200).json({msg:"service Added",data:service})
        }else{
            return res.status(400).json({msg:"Failed to add service, please try again"})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:error.message, name:error.name})
          
    }
}


