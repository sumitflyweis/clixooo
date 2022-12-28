const terms = require('../../models/terms-condition')



exports.getterms = async(req,res) => {
    try {
        const data = await terms.find();
        console.log(data);
        res.status(200).json({
            terms : data[0]
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}
  


