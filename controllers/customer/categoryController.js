const categorySchema = require('../../models/category')



module.exports.getcategory = async(req,res)=>{
    try {
        const {name}=req.params
        console.log(name)
   
       const services= await categorySchema.find({ name: name})
    
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


module.exports.getAllCategory = async(req,res)=>{
    try {   
       const services= await categorySchema.find()
    
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

