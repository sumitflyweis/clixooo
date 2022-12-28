const Wallet = require('../../models/wallet')
const userSchema= require('../../models/User')



  exports.createWallet = async (req, res) => {
    const {user}=req.body 
    console.log(user)
    const wall = await Wallet.findById({_id:user})
    console.log(wall)
    if(!wall){
      const w = await Wallet.create({ user: user })
      
  
      res.status(200).json({
        status: "success",
        data: w,
      });
    }else {  
      res.status(400).json({
        message : "Already wallet  Created "
      })
    }
   
  };

