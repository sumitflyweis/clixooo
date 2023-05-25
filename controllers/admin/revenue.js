const bookings = require("../../models/Bookings");
const userSchema = require("../../models/User");
const heroSchema = require("../../models/hero");
const revenue = require("../../models/revenue");

module.exports.update_revenue_admin = async (req, res) => {
  try {
 const user = await revenue.findOne({_id: req.params.id})
  console.log(user)
 if (user) {
   
    const user1 = await revenue.findOneAndUpdate(
        { _id:req.params.id },
        {
          $set: {
            commission:req.body.commission,
            earning: user.totalAmount - req.body.commission,
          },
        },
        { new: true }
      );

      return res.status(200).json({ msg: "profile updated",data:user1 });
    }
    return res.status(400).json({ msg: "something went wrong" });
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};


module.exports.getrevenue = async (req, res) => {
  try {
    const bookingsData = await revenue.find();

    if (!bookingsData || bookingsData.length == 0)
      return res.status(400).json({ msg: "No bookingsData added" });

    console.log(bookingsData);

    return res.status(200).send(bookingsData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.countOfMaleAndFemale = async (req, res) => {
  try {
    const data1 = await userSchema.find({ gender: "male" });
    const data2 = await userSchema.find({ gender: "female" });

    const data3 = await heroSchema.find({ Gender: "male" });
    const data4 = await heroSchema.find({ Gender: "female" });

    return res.status(200).send({
      male: data1.length + data3.length,
      female: data2.length + data4.length,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};
