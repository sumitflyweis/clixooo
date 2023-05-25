const heroSchema = require("../../models/hero");
const userSchema = require("../../models/User");
const Wallet = require("../../models/wallet");

module.exports.heroService = async (req, res) => {
  try {
    const { name, price, rating } = req.body;
    if (rating >= 1 && rating <= 5) {
      const name1 = await heroSchema.create({ name, price, rating });
      if (name1) {
        return res.status(200).json({ msg: "category Added", data: name1 });
      } else {
        return res
          .status(400)
          .json({ msg: "Failed to add service, please try again" });
      }
    } else {
      return res.status(400).json({ msg: "rating is not in the range " });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message, name: error.name1 });
  }
};

module.exports.addhero = async (req, res) => {
  try {
    const {
      email,
      category,
      name,
      price,
      rating,
      phoneNumber,
      Gender,
      Camera,
      DateOfBirth,
      ProfileImage,
      EquipmentSpecification,
      gadgetside,
      gadgettop,
      gadgetfront,
      Website,
      wallet,
      city,
      SelectSkill,
      SelectExpertise,
      OtherExpertise,
      Aadhaafront,
      driveringfront,
      driveringback,
      Aadhaaback,
      DrivingLicenseNumber,
      AadhaarCardNumber,
      Howdoyoutransferdata,
      status,
      guy,
      categoryStatus,
      services,
    } = req.body;

    const HERO = await heroSchema.create({
      email,
      category,
      name,
      price,
      rating,
      phoneNumber,
      Gender,
      Camera,
      DateOfBirth,
      EquipmentSpecification,
      gadgetside,
      gadgettop,
      gadgetfront,
      Website,
      wallet,
      city,
      SelectSkill,
      SelectExpertise,
      OtherExpertise,
      driveringfront,
      driveringback,
      DrivingLicenseNumber,
      AadhaarCardNumber,
      Howdoyoutransferdata,
      status,
      guy,
      categoryStatus,
      Aadhaaback,
      Aadhaafront,
      services,
    });
    console.log(HERO);

    //  console.log(user)
    console.log(HERO._id.toString());
    console.log(HERO.name);
    const createWallet = await Wallet.create({ hero: HERO._id.toString() });
    console.log(createWallet);
    return res.status(200).json({
      msg: "herodetails Added",
      data: HERO,
      createWallet: createWallet,
    });
  } catch (error) {
    //  else {
    //   return res.status(400).json({ msg: "herodetails is already present " });
    // }
    console.log(error);
    return res.status(500).json({ msg: error.message, name: error.name1 });
  }
};

exports.loginhero = async (req, res) => {
  try {
    const heroexists = await heroSchema.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    console.log(heroexists);

    if (!heroexists || heroexists.length == 0) {
      const otpGen = Math.floor(Math.random() * 9000 + 1000);
      console.log("OTP", otpGen);

      const data = {
        phoneNumber: req.body.phoneNumber,
        otp: otpGen,
      };
      console.log(data);
      const otpToSend = await heroSchema.create(data);

      //console.log(HERO._id.toString())
      const createWallet = await Wallet.create({
        hero: otpToSend._id.toString(),
      });
      console.log(createWallet);
      return res.status(200).json({
        msg: "herodetails Added",
        data: otpToSend,
        createWallet: createWallet,
      });
    } else {
      return res.status(200).json({
        otp: heroexists.otp,
        message: "OTP Generated Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports.verifySignInhero = async (req, res) => {
  try {
    const { otp } = req.body;
    const verifyOtp = await heroSchema.findOne({
      otp: otp,
    });
    if (verifyOtp) {
      return res
        .status(200)
        .json({ msg: "signIn successfull", data: verifyOtp });
    } else {
      return res.status(400).json({ msg: "invalid otp" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.updateHero = async (req, res) => {
  try {
    const {
      email,
      category,
      name,
      price,
      rating,
      phoneNumber,
      Gender,
      Camera,
      DateOfBirth,
      ProfileImage,
      EquipmentSpecification,
      gadgetside,
      gadgettop,
      gadgetfront,
      Website,
      wallet,
      city,
      SelectSkill,
      SelectExpertise,
      OtherExpertise,
      Aadhaafront,
      driveringfront,
      driveringback,
      Aadhaaback,
      DrivingLicenseNumber,
      AadhaarCardNumber,
      Howdoyoutransferdata,
      status,
      guy,
      categoryStatus,
      services,
    } = req.body;

    const hero = await heroSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email,
          category,
          name,
          price,
          rating,
          phoneNumber,
          Gender,
          Camera,
          DateOfBirth,
          ProfileImage,
          EquipmentSpecification,
          gadgetside,
          gadgettop,
          gadgetfront,
          Website,
          wallet,
          city,
          SelectSkill,
          SelectExpertise,
          OtherExpertise,
          Aadhaafront,
          driveringfront,
          driveringback,
          Aadhaaback,
          DrivingLicenseNumber,
          AadhaarCardNumber,
          Howdoyoutransferdata,
          status,
          guy,
          categoryStatus,
          services,
        },
      },
      { new: true }
    );

    if (hero) {
      return res
        .status(200)
        .json({ msg: "profile details updated", data: hero });
    } else {
      return res.status(400).json({ msg: "something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};
