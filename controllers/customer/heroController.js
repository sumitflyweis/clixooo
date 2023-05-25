const heroSchema = require("../../models/hero");
const userSchema = require("../../models/User");

const categorySchema = require("../../models/category");
const Wallet = require("../../models/wallet");

module.exports.gethero = async (req, res) => {
  try {
    //const name = req.params;

    const services = await heroSchema.find();
    console.log(services);
    if (services) {
      return res.status(200).json(services);
    } else {
      return res.status(400).json({ msg: "No services added" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.gethero1 = async (req, res) => {
  try {
    const price = req.body;

    const services = await heroSchema.find(price);

    if (services) {
      return res.status(200).json(services);
    } else {
      return res.status(400).json({ msg: "No services added", data: services });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.getherorole = async (req, res) => {
  try {
    const services = await heroSchema.find();
    console.log(services);
    const services1 = await userSchema.find({ role: "hero" });
    console.log(services1);

    return res.status(200).json({ services, services1 });
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.gethero3InCustomer = async (req, res) => {
  try {
    const { name, ActualPrice } = req.params;
    // name: { type: String },
    // ActualPrice: { type: Number },
    // ExpectedPrice: { type: Number },
    const price1 = await categorySchema.findOne({
      ActualPrice: ActualPrice,
      name: name,
    });
    // console.log(price1.price);
    if (!price1 || price1.length == 0)
      return res.status(404).json({ msg: "No category" });
    const price2 = await heroSchema.find({
      price: { $lte: price1.ActualPrice },
    });
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

// module.exports.getheroWhoAccepted = async (req, res) => {
//   try {
//     // const { name, ActualPrice } = req.params;

//     const { guy,categoryStatus } = req.params;
//     console.log(categoryStatus)
//    // const price1 = await categorySchema.findOne({ ActualPrice: ActualPrice, name: name });
//   const data = await heroSchema.find({ guy: guy, categoryStatus: categoryStatus });
//     console.log(data)
//     // console.log(price1.price);
//     if (!data || data.length == 0)
//       return res.status(404).json({ msg: "No hero" });
//     // const price2 = await heroSchema.find({ price: { $lte: price1.ActualPrice } });
//     // console.log(price2);
//     // if (!price2 || price2.length == 0) {
//     //   return res.status(404).json({ msg: "No hero are there" });
//     // } else {
//       return res.status(200).json(data);
//     // }
//   } catch (error) {
//     return res.status(400).json({ msg: error.message, name: error.name });
//   }
// };

module.exports.getheroWhoAccepted = async (req, res) => {
  try {
    const query = { ...req.query };

    // Use aggregation to count the number of heroes that match the criteria
    const data = await heroSchema.aggregate([
      {
        $match: query, // Match the given criteria
      },
      // {
      //   $count: "totalHeroes", // Count the number of documents and store it in "totalHeroes"
      // },
    ]);

    if (!data || data.length === 0) {
      // If no data is found, return a 404 status response
      return res.status(404).json({ msg: "No hero found" });
    }

    // If data is found, return a 200 status response with the total number of heroes
    return res.status(200).json({ totalHeroes: data.length, data: data });
  } catch (error) {
    // If an error occurs, return a 400 status response with the error message and name
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.update_gethero3_toRaisePrice = async (req, res) => {
  try {
    const price1 = await categorySchema.findOne({
      ActualPrice: req.params.ActualPrice,
      name: req.params.name,
    });
    // console.log(price1);
    if (!price1 || price1.length == 0)
      return res.status(404).json({ msg: "No category" });
    const price2 = await heroSchema.find({
      price: { $lte: price1.ActualPrice },
    });
    console.log(price2);
    if (!price2 || price2.length == 0) {
      const hero = await heroSchema.updateMany({}, { $inc: { price: +100 } });
      return res
        .status(200)
        .send({ msg: "price increased by 100 to all name given in params" });
    } else {
      return res.status(200).json(price2);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

const Hero = require("../../models/hero"); // Importing the Hero model

// API endpoint to update user to hero
exports.updateUserToHero = async (req, res) => {
  try {
    const { userId } = req.params; // Extracting userId from request parameters
    const { name, email, role } = req.body; // Extracting name, email, and role from request body

    if (role !== "user") {
      // Checking if the role is not 'user'
      return res
        .status(400)
        .json({ error: 'Role must be "user" to update to hero' });
    }

    // Finding the user in the Hero model by userId
    const user = await heroSchema.findById(userId);

    if (!user) {
      // Checking if the user is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Updating user fields to match the Hero schema
    user.name = name;
    user.email = email;
    user.role = "hero";

    // Saving the updated user in the Hero model
    const updatedUser = await user.save();

    // Sending the updated user as response
    res.json(updatedUser);
  } catch (error) {
    // Handling any errors that occur during the update process
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.updateUserTohero = async (req, res) => {
//   try {
//     const {
//       userId,
//       email,
//       category,
//       name,
//       price,
//       rating,
//       phoneNumber,
//       Gender,
//       Camera,
//       DateOfBirth,
//       ProfileImage,
//       EquipmentSpecification,
//       gadgetside,
//       gadgettop,
//       gadgetfront,
//       Website,
//       wallet,
//       city,
//       SelectSkill,
//       SelectExpertise,
//       OtherExpertise,
//       Aadhaafront,
//       driveringfront,
//       driveringback,
//       Aadhaaback,
//       DrivingLicenseNumber,
//       AadhaarCardNumber,
//       Howdoyoutransferdata,
//       status,
//       guy,
//       categoryStatus,
//       services,
//     } = req.body; //

//     const user = await userSchema.findOne({ _id: userId });

//     if (!user) {
//       // If user not found, return error response
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Create a new hero with the same _id as the user and hero fields
//     const hero = new heroSchema({
//       _id: user._id, // Set _id of hero same as user
//       email,
//       category,
//       name,
//       price,
//       rating,
//       phoneNumber,
//       Gender,
//       Camera,
//       DateOfBirth,
//       ProfileImage,
//       EquipmentSpecification,
//       gadgetside,
//       gadgettop,
//       gadgetfront,
//       Website,
//       wallet,
//       city,
//       SelectSkill,
//       SelectExpertise,
//       OtherExpertise,
//       Aadhaafront,
//       driveringfront,
//       driveringback,
//       Aadhaaback,
//       DrivingLicenseNumber,
//       AadhaarCardNumber,
//       Howdoyoutransferdata,
//       status,
//       guy,
//       categoryStatus,
//       services,
//     });

//     // Save the hero to the database
//     const savedHero = await hero.save();

//     // Update the user model with hero fields
//     user.name = name;
//     user.email = email;
//     user.price = price;
//     user.rating = rating;
//     user.guy = guy;
//     user.ProfileImage = ProfileImage;
//     user.category = category;
//     user.phoneNumber = phoneNumber;
//     user.Gender = Gender;
//     user.Camera = Camera;
//     user.DateOfBirth = DateOfBirth;
//     (user.EquipmentSpecification = EquipmentSpecification),
//       (user.gadgetside = gadgetside);
//     user.gadgettop = gadgettop;
//     user.gadgetfront = gadgetfront;

//     user.Website = Website;
//     user.wallet = wallet;
//     user.city = city;
//     user.SelectSkill = SelectSkill;
//     user.SelectExpertise = SelectExpertise;
//     user.OtherExpertise = OtherExpertise;
//     user.Aadhaafront = Aadhaafront;
//     user.driveringfront = driveringfront;
//     user.driveringback = driveringback;
//     user.Aadhaaback = Aadhaaback;
//     user.DrivingLicenseNumber = DrivingLicenseNumber;
//     user.AadhaarCardNumber = AadhaarCardNumber;
//     user.Howdoyoutransferdata = Howdoyoutransferdata;
//     user.status = status;
//     user.guy = guy;
//     user.categoryStatus = categoryStatus;
//     user.services = services;

//     await user.save();

//     res
//       .status(200)
//       .json({ message: "Hero created successfully", hero: savedHero });
//   } catch (error) {
//     console.error("Error creating hero:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
