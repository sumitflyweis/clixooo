const serviceSchema = require('../../models/services')




module.exports.getServices = async(req,res)=>{
    try {
        
        const services = await serviceSchema.find()

        if(services){
            return res.status(200).json(services)
        }else{
            return res.status(400).json({msg:"No services added"})
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
  
}

module.exports.getServicesById= async(req,res)=>{
    try {
        // const paramsId=req.params.id
        // const services = await serviceSchema.findById(paramsId)

        // if(services){
        //     return res.status(200).json(services)
        // }else{
        //     return res.status(400).json({msg:"No services added",data:services})
        // }
        // try {
            const user = await serviceSchema.findOne({_id: req.params.id}).populate('categoryId');
            if(!user || user.length==0){
                return res.status(400).send({msg:"no data"})
            }else{
                return res.status(200).json({user})
            }
         }catch (error) {
            return res.status(400).json({ msg: error.message, name: error.name });
          }
  }


module.exports.getServicesByName= async(req,res)=>{
    try {
        const queryname=req.query.name
        console.log(queryname)
        const services = await serviceSchema.find({name:queryname})

        if(services){
            return res.status(200).json(services)
        }else{
            return res.status(400).json("No services added")
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}
