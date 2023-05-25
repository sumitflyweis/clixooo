const userSchema = require("../../models/User")
const otpSchema = require("../../models/otp")
const Wallet = require('../../models/wallet')
const jwt = require('jsonwebtoken')
const newOTP = require('otp-generators');


module.exports.createUser = async(req,res)=>{

    try {
        const {name,phoneNumber,role,gender,email,birth,city,website,ishero,status,wallet,rating} = req.body

        if(!(name && phoneNumber)){
            return res.status(400).json({msg:"Fields are required"})
        }

        const otp = Math.floor((Math.random()*10000)+1)
        console.log(otp)
        const user = await userSchema.create({
            name: name,phoneNumber:phoneNumber,otp:otp ,role:role,gender:gender,email:email,birth:birth,city:city,website:website,ishero:ishero,status:status,wallet:wallet,rating:rating
        })
     console.log(user)
     console.log(user._id.toString())
     const createWallet = await Wallet.create({user:user._id.toString()})
      console.log(createWallet)
        if(user){
        //     const token = jwt.sign({_id:user._id}, process.env.KEY, {expiresIn:'1d'})
        //    // console.log(token)
        //     res.setHeader('Authorization', 'Bearer '+ token)
        //   //let data =user.name,
            return res.status(200).json({msg:"otp has been sent to your number",user:user,createWallet:createWallet})
        }else{
            return res.status(400).json({msg:"Something went wrong, try again"})
        }
        
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
    }
}



module.exports.getUser = async (req, res) => {
  try {
    const user = await userSchema.find({status:req.params.status})
if(!user){return res.status(404).send("User not found")
}else{
    return res.status(200).json({ msg: "profile details updated",count:user.length, data: user });
  } 
}catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.updateUserinadmin = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      age,
      rating,
      gender,
      ishero,
      email,
      birth,
      city,
      website,
      _id,
      status,
      block,
      wallet,
      message,
    } = req.body;

    const user = await userSchema.findOneAndUpdate(
      { _id:req.params.id },
      {
        $set: {
          name,
      phoneNumber,
      age,
      rating,
      gender,
      ishero,
      email,
      birth,
      city,
      website,
      _id,
      status,
      block,
      wallet,
      message
        },
      },
      { new: true }
    );

    if (user) {
      return res
        .status(200)
        .json({ msg: "profile details updated", data: user });
    } else {
      return res.status(400).json({ msg: "something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

exports.deleteuserByIdinadmin = async (req, res) => {
  try {
    const deleted = await userSchema.findByIdAndRemove(req.params.id);
    if (!deleted) {
      return res.status(400).json({
        message: " not found",
      });
    }
    return res.status(200).json({
      message: " deleted",
      data: deleted,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.getuserByIdinadmin = async (req, res) => {
  try {
    const getuser = await userSchema.findById(req.params.id);
    console.log(getuser);
    if (!getuser) {
      return res.status(400).json({
        message: " not found",
      });  
    }
    return res.status(200).json({
      message: " getuser",
      data: getuser,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
