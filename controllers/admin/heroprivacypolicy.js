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




