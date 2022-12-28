const herorating = require('../../models/hero-rating')
const userSchema= require('../../models/User')
const heroSchema = require('../../models/hero')

exports.getterms = async(req,res) => {
    try {
        const data = await herorating.find();
        console.log(data);
        res.status(200).json({
            terms : data
        })
          
    }catch(err)  
    {
        res.status(400).send({mesage : err.mesage});
    }
}


