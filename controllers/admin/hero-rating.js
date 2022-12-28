const herorating = require('../../models/hero-rating')
const userSchema= require('../../models/User')
const heroSchema = require('../../models/hero')

exports.getterms = async(req,res) => {
    try {
        const data = await herorating.find();
        console.log(data);
        res.status(200).json({
            terms : data[0]
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}

exports.updateterms = async (req, res ) => {
    try {
        
        const UpdatedTerms = await herorating.findOneAndUpdate({_id: req.params.id}, {
            rating: req.body.rating
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
    await herorating.deleteOne({_id: id});
    res.status(200).send({message: "Terms deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}