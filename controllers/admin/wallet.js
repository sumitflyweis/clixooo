const Wallet = require('../../models/wallet')
const userSchema= require('../../models/User')
const heroSchema= require('../../models/hero')



  // exports.createWallet = async (req, res) => {
  //   const {user}=req.body
  //   console.log(user)
  //   const wall = await Wallet.findOne({user:user})
  //   console.log(wall)
  //   if(!wall || wall.length==0){
  //     const w = await Wallet.create({ user: user })
  //   return  res.status(200).json({
  //       status: "success",
  //       data: w,
  //    });
  //   }else {  
  //  return   res.status(400).json({
  //       message : "Already wallet  Created "
  //     })
  //   }
   
  // };


  
  exports.createWallet = async (req, res) => {
    const {user}=req.body
    console.log(user)
    const wall = await Wallet.findOne({user:user})
    console.log(wall)
    if(!wall || wall.length==0){
      const w = await Wallet.create({ user: user })
    return  res.status(200).json({
        status: "success",
        data: w,
     });
    }else {  
   return   res.status(400).json({
        message : "Already wallet  Created "
      })
    }
   
  };
  

  
  exports.createWalletofhero = async (req, res) => {
    const {hero}=req.body 
    console.log(hero)
    const wall = await Wallet.findOne({hero:hero})
    console.log(wall) 
    if(!wall || wall.length==0){
      const w = await Wallet.create({ hero: hero })
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



  
exports.addandremoveMoneyinadmin = async (req, res) => {
  if(req.body.addbalance){
  const wallet = await Wallet.findOne({user: req.params.user });
  
  if(wallet == null){
    res.status(400).json({
      message: "Wallet is Not Created "
    })
  
  }else{
   wallet.balance = parseInt(wallet.balance) + parseInt(req.body.addbalance);
 
  //console.log(wallet.balance)
   const w = await wallet.save();
   const user1=await userSchema.findByIdAndUpdate({_id:wallet.user},{wallet:wallet.balance},{new:true})
 
  res.status(200).json({
    status: "success",
   data: [w,user1]
  });
}
}
if(req.body.removebalance){

const wallet = await Wallet.findOne({user: req.params.user });

if(parseInt(wallet.balance) <parseInt(req.body.removebalance) ){ return res.status(400).json({msg:"insuffient balance"}); 
}else{


wallet.balance = parseInt(wallet.balance) - parseInt(req.body.removebalance)

//console.log(wallet.balance);
const w = await wallet.save();

const user1=await userSchema.findByIdAndUpdate({_id:wallet.user},{wallet:wallet.balance},{new:true})
 
  res.status(200).json({
    status: "success",
   data: [w,user1]
  })
};
}
}


 
exports.addandremoveMoneyinadminofhero = async (req, res) => {
  if(req.body.addbalance){
  const wallet = await Wallet.findOne({ hero: req.params.hero });
  
  if(wallet == null){
    res.status(400).json({
      message: "Wallet is Not Created "
    })
  
  }else{
   wallet.balance = parseInt(wallet.balance) + parseInt(req.body.addbalance);
  
  const w = await wallet.save();
   const user1=await heroSchema.findByIdAndUpdate({_id:wallet.hero},{wallet:wallet.balance},{new:true})
 
  res.status(200).json({
    status: "success",
   data: [w,user1]
  });
}
}
if(req.body.removebalance){

const wallet = await Wallet.findOne({hero: req.params.hero });
//console.log(wallet.balance);
if(parseInt(wallet.balance) <parseInt(req.body.removebalance) ){ return res.status(400).json({msg:"insuffient balance"}); 
}else{


wallet.balance = parseInt(wallet.balance) - parseInt(req.body.removebalance)

//console.log(wallet.balance);
const w = await wallet.save();
//console.log(w);
const user1=await heroSchema.findByIdAndUpdate({_id:wallet.hero},{wallet:wallet.balance},{new:true})
 
  res.status(200).json({
    status: "success",
   data: [w,user1]
  })
};
}
}


exports.getWalletByIdOfHero = async (req, res) => {
 
  const wall = await Wallet.find({hero:req.params.hero})
  console.log(wall)
  if(wall){
   
    res.status(200).json({
      status: "success",
      data: wall,
    });
  }else {  
    res.status(400).json({
      message : " wallet not Created "
    })
  }
 
};
