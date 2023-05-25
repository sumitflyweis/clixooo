const categorySchema = require("../../models/category");
const serviceSchema = require("../../models/services");

module.exports.categoryService = async (req, res) => {
  try {
      const data = 
      {
        name: req.body.name,
        desc: req.body.desc,
        photoActual: req.body.photoActual, 
        photoExcepted: req.body.photoExcepted,
        videoActual: req.body.videoActual,
        videoExcepted: req.body.videoExcepted,
        dronActual: req.body.dronActual,
        dronExcepted: req.body.dronExcepted
      }   

    // const category = await categorySchema.create({data:data})
      const category = await categorySchema.create(data)
    console.log(category)

    // const user1 = await categorySchema.find();
    // console.log(user1);

    // const user = await serviceSchema.findByIdAndUpdate(
    //   {_id:req.params.id},
    //   { $push: {categoryId:category._id} },
    //   { new: true }
    // );

    // const service = await serviceSchema.find()
    // console.log(service)

    if (category) {
      return res.status(200).json({ msg: "category Added", data: category })
    } else {
      return res
        .status(400)
        .json({ msg: "Failed to add service, please try again" })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error.message, name: error.name })
  }
}

module.exports.getcategorybyadmin = async (req, res) => {
  try {
    // const { name } = req.params;
    // console.log(name);
    const services = await categorySchema.find();
    console.log(services);
    if (!services || services.length == 0) {
      return res.status(400).json({ msg: "No services added" });
    } else {
      return res.status(200).json(services);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

// module.exports.updatecategorybyadmin = async (req, res) => {
//   try {
// let update = req.params.update;
// let name = req.body.name;

// if (!update || update.length < 24)
//   return res.status(400).json("invalid userid");

// const user = await categorySchema.findOneAndUpdate(
//   { _id: update },
//   { name: name },
//   { new: true }
// );
// console.log(user);
// return res.status(200).json(user);

module.exports.updatecategorybyadmin = async (req, res) => {
  try {

    const data = 
    {
        name: req.body.name,
        desc: req.body.desc,
        photoActual: req.body.photoActual, 
        photoExcepted: req.body.photoExcepted,
        videoActual: req.body.videoActual,
        videoExcepted: req.body.videoExcepted,
        dronActual: req.body.dronActual,
        dronExcepted: req.body.dronExcepted,
       
    }   
    const user = await categorySchema.findOneAndUpdate(
      {_id: req.params.id},
       data ,
      { new: true }
    );


    // const user1 = await categorySchema.find();
    // console.log(user1);

    // const service = await serviceSchema.updateMany(
    //   {},
    //   { user: user1[0] },
    //   { new: true }
    // );

    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

exports.deletecategorybyadmin = async (req, res) => {
  try {
    const id = req.params.id;
    await categorySchema.deleteOne({ _id: id });
    res.status(200).send({ message: "category deleted " });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.updatecategoryinServiceInAdmin = async (req, res) => {
  try {
    const data = await serviceSchema.findOne({ _id: req.params.id });
    //console.log(data)
    if (data == null) {
      res.status(400).json({
        message: "data is Not Created ",
      });
    } else {
      console.log(data._id.toString());

      //   //console.log(wallet.balance)
      //    const w = await wallet.save();
      //    const user1=await userSchema.findByIdAndUpdate({_id:wallet.user},{wallet:wallet.balance},{new:true})

      //   res.status(200).json({
      //     status: "success",
      //    data: [w,user1]
      //   });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
