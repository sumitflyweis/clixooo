const citySchema = require('../../models/city')

module.exports.postcity = async(req,res)=>{
    try {
        const city = req.body.city
      if(!city || city.length==0 || city=="")return res.status(400).json("city should be present")
      const city2 = await citySchema.findOne({city:city})
      console.log(city2)
      if(!city2){ 
        const city1 = await citySchema.create({city:city})
       return res.status(200).json({msg:"city Added",data:city1})
      
      }
      else{
        return res.status(400).send({msg:"city already present "})
       
    }
    } catch (error) {  
        console.log(error)
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}


module.exports.getcity = async(req,res)=>{
    try {
         
      const services= await citySchema.find()
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

exports.getcitybyid = async (req, res) => {
    try {
      const city = await citySchema.findById(req.params.id);
      if (!city) {
        return res.status(400).json({
          message: "city not found",
        });
      }
      return res.status(200).json({
        message: "city found",
        data: city,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        message: "internal server error",
      });
    }
  };

  exports.deletecity = async(req,res) => {
    try {
    const id = req.params.id; 
    await citySchema.deleteOne({_id: id});
    res.status(200).send({message: "city deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}
