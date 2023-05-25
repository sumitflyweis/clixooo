const land = require("../../models/banner hero");
// const multer  = require('multer');

exports.getlandById = async (req, res) => {
  try {
    const landDetails = await land.findById({ _id: req.params.id });
    console.log(landDetails);
    res.status(200).json({
      details: landDetails,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getland = async (req, res) => {
  try {
    const alland = await land.find();
    console.log(alland);
    res.status(200).json({
      message: "All lands ",
      Data: alland,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: err.message,
    });
  }
};
