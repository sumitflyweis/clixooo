const help = require('../../models/helpandsupportforhero')


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




