const privacy = require('../../models/heroprivacypolicy')


exports.addterms = async (req,res) =>{
    try{
        const input=req.body
   const input1 =    await privacy.create(input);
   console.log(input1)
      res.status(200).json({
            message: " please contact below ", 
       details : input1
     })
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send({message: err.message})
    }
}


exports.updateprivacy = async (req, res ) => {
    try {
       
        const UpdatedTerms = await privacy.findOneAndUpdate({_id: req.params.id}, {
            data: req.body.data
        })//.exec();
        console.log(UpdatedTerms);
        res.status(200).json({
            message: "Terms Update" ,data:UpdatedTerms
        })
        
        
    }catch(err)
    {
       console.log(err)
       res.status(401).json({
        mesage: err.mesage
       })
    }
}


exports.getprivacybyadmin = async(req,res) => {
    try {
        const data = await privacy.find();
        console.log(data);
        res.status(200).json({
            terms : data
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}



exports.deleteprivacybyadmin = async (req, res) => {
    try {
      const deleteData = await privacy.findOneAndDelete({_id:req.params.id});
      if (!deleteData) {
        return res.status(400).json({
          message: "Data not found",
        });
      }
      return res.status(200).json({
        message: "Data deleted",
        data: deleteData,
      });
    } catch (err) {
      console.log(err.message);
   return  res.status(500).json({
        message: "internal server error",
      });
    }
  };
  
