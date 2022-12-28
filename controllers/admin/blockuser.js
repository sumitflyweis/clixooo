const blockSchema = require('../../models/blockuser')
const userSchema= require('../../models/User')

module.exports.block = async(req,res)=>{
    try {
        const userid = req.body.userid
       console.log(userid)
         const Userid1=await  userSchema.findById(userid)
         console.log(Userid1)
         if(Userid1.block==true){
            // console.log(Userid1["block"])
           const user2= await blockSchema.create({Userid1})
             res.status(200).send({status:true,data:"block user",data1:Userid1})
         }else{
            res.status(200).send({status:false,data:"user is not blocked"})
        
         }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:error.message, name:error.name1})
        
    } 
}
  



module.exports.getblock = async(req,res)=>{
    try {
    
     
      const block1= await blockSchema.find({})
        console.log(block1)
      return res.status(200).json(block1)
       
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}
 
