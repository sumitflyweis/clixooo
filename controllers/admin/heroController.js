const heroSchema = require("../../models/hero");
const userSchema = require("../../models/User");
const categorySchema = require("../../models/category");
const Wallet=require("../../models/wallet")

module.exports.gethero2 = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    const services = await heroSchema.find({ name });
    console.log(services);
    if (services.length == 0) return res.status(404).json("name is not find");
    else if (services.length > 0) {
      return res.status(200).json(services);
    } else {
      return res.status(400).json({ msg: "No services added", data: services });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.gethero3 = async (req, res) => {
  try {
    const { name, price } = req.params;
    const price1 = await categorySchema.findOne({ price: price, name: name });
    // console.log(price1.price);
    if (!price1 || price1.length == 0)
      return res.status(404).json({ msg: "No category" });
    const price2 = await heroSchema.find({ price: { $lte: price1.price } });
    console.log(price2);
    if (!price2 || price2.length == 0) {
      return res.status(404).json({ msg: "No hero are there" });
    } else {
      return res.status(200).json(price2);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.update_gethero3_admin = async (req, res) => {
  try {
    const price1 = await categorySchema.findOne({
      price: req.params.price,
      name: req.params.name,
    });
    // console.log(price1);
    if (!price1 || price1.length == 0)
      return res.status(404).json({ msg: "No category" });
    const price2 = await heroSchema.find({ price: { $lte: price1.price } });
    console.log(price2);
    if (!price2 || price2.length == 0) {
      const hero = await heroSchema.findAndUpdate(
        {},
        { $inc: { price: +100 } }
      );
    } else {
      return res.status(200).json(price2);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};


module.exports.update_editHero_admin = async (req, res) => {
  try {
  
    const data = await heroSchema.findByIdAndUpdate(
      { _id: req.params.id },
     { email: req.body.email,
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      phoneNumber: req.body.phoneNumber,
      Gender: req.body.Gender,
      Camera: req.body.Camera,
      DateOfBirth: req.body.DateOfBirth,
      ProfileImage: req.body.ProfileImage,
      EquipmentSpecification: req.body.EquipmentSpecification,
      GadgetPhoto: req.body.GadgetPhoto,
       GadgetPhoto: {sideview:req.body.sideview, topview:req.body.topview, frontview:req.body.frontview },
      Website: req.body.Website,
    //  wallet: req.body.wallet,
      city: req.body.city,
      SelectSkill: req.body.SelectSkill,
      SelectExpertise: req.body.SelectExpertise,
      OtherExpertise: req.body.OtherExpertise,
      DrivingLicense: req.body.DrivingLicense,
       DrivingLicense: { frontside:req.body.frontside, backside:req.body.backside },
      DrivingLicenseNumber: req.body.DrivingLicenseNumber,
      AadhaarCard: req.body.AadhaarCard,
       AadhaarCard: { frontside1:req.body.frontside1, backside1:req.body.backside1 },
      AadhaarCardNumber: req.body.AadhaarCardNumber,
      Howdoyoutransferdata: req.body.Howdoyoutransferdata,
      status: req.body.status,},
    
      { new: true }
    );
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.getherorole4 = async (req, res) => {
  try {
    //const HERO = await heroSchema.find({ status: req.params.status });
    const HERO = await heroSchema.find();
    console.log(HERO);
    if (!HERO || HERO.length == 0) {
      return res.status(404).json({ msg: "hero not found" });
    } else {
      const USER = await userSchema.find({ role: "hero" });
      if (!USER || USER.length == 0){
        return res.status(404).json({ msg: "hero as a user  not found" });
      }else{
      console.log(USER);
      return res.status(200).json({ HERO: HERO, USER: USER });
    }
  }
 } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.getherobyid = async (req, res) => {
  try {
    const services = await heroSchema.find({ _id: req.params.id });
    console.log(services);
    if (!services || services.length == 0) {
      return res.status(404).json({ msg: "No hero added" });
    } else {
      return res.status(200).json({ services });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.addherobyadmin = async (req, res) => {
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
        categoryStatus
    } = req.body;
    // const herodetails = await heroSchema.find({
    //   $and: [{ name: name }, { price: price }],
    // });
    // console.log(herodetails);

    // if (!herodetails || herodetails.length == 0) {
    //   if (rating >= 1 && rating <= 5) {
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
          Aadhaafront
        });
        console.log(HERO);

      //  console.log(user)
        console.log(HERO._id.toString())
        const createWallet = await Wallet.create({hero:HERO._id.toString()})
         console.log(createWallet)
        return res.status(200).json({ msg: "herodetails Added", data: HERO,createWallet:createWallet });
      }
    //  else {
    //   return res.status(400).json({ msg: "herodetails is already present " });
    // }
   catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message, name: error.name1 });
  }
};

module.exports.update_customer_to_heroby_admin = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await userSchema.findOneAndUpdate(
      { _id: id },
      { $push: { role: "hero" } },
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

exports.changeStatusbyid = async (req, res) => {
  try {
    const changestatus = await heroSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true }
    );
    if (!changestatus) {
      return res.status(400).json({
        message: "status not found",
      });
    }
    return res.status(200).json({
      message: "status found",
      data: changestatus,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.deleteheroByIdinadmin = async (req, res) => {
  try {
    const deleted = await heroSchema.findByIdAndRemove(req.params.id);
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
