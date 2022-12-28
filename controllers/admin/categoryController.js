const categorySchema = require('../../models/category')

module.exports.categoryService = async(req,res)=>{
    try {
        const {name} = req.body
      if(!name || name.length==0 || name=="")return res.status(400).json("data should be present")

        const category = await categorySchema.create({name})

        if(category){
            return res.status(200).json({msg:"category Added",data:category})
        }else{
            return res.status(400).json({msg:"Failed to add service, please try again"})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}




