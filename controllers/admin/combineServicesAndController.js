const combinedSchema = require("../../models/combineservicesAndcategory");

module.exports.combineServiceAndcategory = async (req, res) => {
  try {
    const service1 = req.body.services;
    console.log(service1);
    const data = {
      name: req.body.categ,
      price: req.body.price,
    };
    console.log(req.body.categ);
    console.log(req.body.price);
    const combined = await combinedSchema.create({
      service: service1,
      category: data,
    });
    return res.status(201).json({ data: combined });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.getserviceById_Byadmin = async (req, res) => {
  try {
    const user = await combinedSchema.find({ _id: req.params.id });
    if (!user || user.length == 0) {
      return res.status(404).json({ msg: "data not present" });
    } else {
      return res
        .status(200)
        .json({ msg: " get combined details ", data: user });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};


module.exports.getcombinedByadmin = async (req, res) => {
    try {
      const user = await combinedSchema.find({});
      if (!user || user.length == 0) {
        return res.status(404).json({ msg: "data not present" });
      } else {
        return res
          .status(200)
          .json({ msg: " get combined details ", data: user });
      }
    } catch (error) {
      return res.status(400).json({ msg: error.message, name: error.name });
    }
  };


module.exports.updatecombinedbyadmin = async (req, res) => {
  try {
    let id = req.params.id;
    let service1 = req.body.service;
    const data = { 
        name: req.body.category.name, 
        price: req.body.category.price 
    };
    console.log(service1);
    console.log(data);

    if (!id || id.length < 24) return res.status(400).json("invalid userid");

    const user = await combinedSchema.findOneAndUpdate(
      { _id: id },
      { category:data, service: service1 },
      { new: true }
    );
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

exports.deletecombinedbyID = async(req,res) => {
    try {
    const id = req.params.id; 
    await combinedSchema.deleteOne({_id: id});
    res.status(200).send({message: " deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}


