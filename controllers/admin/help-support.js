const help = require('../../models/help-support')


exports.addterms = async (req,res) =>{
    try{
        const help1=req.body
   const helpData =    await help.create(help1);
   console.log(help)
      res.status(200).json({
       // data : policyData,
       message: " please contact below ", 
       details : helpData
     })
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send({message: err.message})
    }
}



exports.updateterms = async (req, res ) => {
    try {
       
        const UpdatedTerms = await help.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name
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


exports.DeleteTerms = async(req,res) => {
    try {
    const id = req.params.id; 
    await help.deleteOne({_id: id});
    res.status(200).send({message: "Terms deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}


exports.gethelpandsupportbyadmin = async(req,res) => {
    try {
        const data = await help.find();
        console.log(data);
        res.status(200).json({
            terms : data  
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}
  