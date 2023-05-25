const Wallet = require('../../models/wallet')
const heroSchema= require('../../models/hero')



  exports.createWalletbyhero = async (req, res) => {
    const {hero}=req.body 
    console.log(hero)
    const wall = await Wallet.findById({_id:hero})
    console.log(wall)
    if(!wall){
      const w = await Wallet.create({ hero: hero})
      
  
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


exports.addMoneybyhero = async (req, res) => {
      const wallet = await Wallet.findOne({ hero:req.body.hero});
    console.log(wallet);
    //console.log(req.body.balance) parseInt("10")
    console.log(parseInt(req.body.balance))


    if(wallet == null){
      res.status(400).json({
        message: "Wallet is Not Created "
      })
    //   wallet.balance =  req.body.balance;
    //   const w = await wallet.save();
    // res.status(200).json({
    //   status: "success",
    //  data: w,
    // });
    }else{
     wallet.balance = parseInt(wallet.balance) + parseInt(req.body.balance);
    console.log(wallet.balance)
     const w = await wallet.save();
  
    res.status(200).json({
      status: "success",
     data: w,
    });
  }
  }


  exports.removeMoneybyhero = async (req, res) => {
    const wallet = await Wallet.findOne({ hero: req.body.hero });
    console.log(wallet.balance);
  if(parseInt(wallet.balance) <parseInt(req.body.balance) ){ return res.status(400).json({msg:"insuffient balance"}); 
  }else{

  
    wallet.balance = parseInt(wallet.balance) - parseInt(req.body.balance)
    console.log(wallet.balance);
   console.log( req.body.balance)
    const w = await wallet.save();
    console.log(w);
  
    res.status(200).json({
      status: "success",
      data: w,
    });
  };
}
  
