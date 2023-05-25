const serviceSchema = require("../../models/services");
const categorySchema = require('../../models/category')

module.exports.addService = async (req, res) => {
  try {
    const { service,description,categoryId } = req.body;

    const service1 = await serviceSchema.create({ service: service ,description:description,categoryId:categoryId});

    if (service1) {
      return res.status(200).json({ msg: "service Added", service1 });
    } else {
      return res
        .status(400)
        .json({ msg: "Failed to add service, please try again" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};


module.exports.getservicebyadmin = async (req, res) => {
  try {
    const user = await serviceSchema.findOne({_id: req.params.id}).populate('categoryId');
    if(!user || user.length==0){
        return res.status(400).send({msg:"no data"})
    }else{
        return res.status(200).json({user})
    }
 }catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};



module.exports.getserviceById_Byadmin = async (req, res) => {
  try {
    const user = await serviceSchema.findById({ _id: req.params.id })

    return res.status(200).json({ msg: " get service details ", data: user });
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.updateservicesinadmin = async (req, res) => {
  try {
    const user = await serviceSchema.findOneAndUpdate(
      { _id: req.params.id },
      { service: req.body.service },
      { new: true }
    )
    if (user) {
      return res
        .status(200)
        .json({ msg: "service details updated", data: user });
    } else {
      return res.status(400).json({ msg: "something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

exports.deleteservicesByIdinadmin = async (req, res) => {
  try {
    const deleted = await serviceSchema.findByIdAndRemove(req.params.id);
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


