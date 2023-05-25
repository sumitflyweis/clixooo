const userSchema = require("../../models/User");
const otpSchema = require("../../models/otp");
const Wallet = require("../../models/wallet");
const jwt = require("jsonwebtoken");
const newOTP = require("otp-generators");

module.exports.register = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      role,
      gender,
      email,
      birth,
      city,
      website,
      ishero,
      status,
      wallet,
      rating,
      profile,
    } = req.body;

    if (!(name && phoneNumber)) {
      return res.status(400).json({ msg: "Fields are required" });
    }

    const otp = Math.floor(Math.random() * 10000 + 1);
    console.log(otp);
    const user = await userSchema.create({
      name: name,
      phoneNumber: phoneNumber,
      otp: otp,
      role: role,
      gender: gender,
      email: email,
      birth: birth,
      city: city,
      website: website,
      ishero: ishero,
      status: status,
      wallet: wallet,
      rating: rating,
      profile: profile,
    });
    console.log(user);
    console.log(user._id.toString());
    console.log(user.name);
    const createWallet = await Wallet.create({ user: user._id.toString() });
    console.log(createWallet);
    if (user) {
      //     const token = jwt.sign({_id:user._id}, process.env.KEY, {expiresIn:'1d'})
      //    // console.log(token)
      //     res.setHeader('Authorization', 'Bearer '+ token)
      //   //let data =user.name,
      return res.status(200).json({
        msg: "otp has been sent to your number",
        user: user,
        createWallet: createWallet,
      });
    } else {
      return res.status(400).json({ msg: "Something went wrong, try again" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.verifySignIn = async (req, res) => {
  try {
    const { name, phoneNumber, otp } = req.body;
    const verifyOtp = await userSchema.findOne({
      /*name:name,phoneNumber:phoneNumber,*/ otp: otp,
    });
    if (verifyOtp) {
      return res
        .status(200)
        .json({ msg: "signIn successfull", data: verifyOtp });
    } else {
      // const user = await userSchema.create({name,phoneNumber,otp})
      // if(user){
      //    // return res.status(200).json({msg:"signIn successfull",data:user})
      // }else{
      return res.status(400).json({ msg: "invalid otp" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

exports.login = async (req, res) => {
  try {
    const userexists = await userSchema.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    console.log(userexists);

    if (!userexists || userexists.length == 0) {
      const otpGen = newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });

      const data = {
        phoneNumber: req.body.phoneNumber,
        otp: otpGen,
      };
      console.log(data);
      const otpToSend = await userSchema.create(data);
      console.log(otpToSend.otp);

      console.log(otpToSend._id.toString());
      // console.log(otpToSend.name);
      const createWallet = await Wallet.create({
        user: otpToSend._id,
      });
      console.log(createWallet);

      return res.status(200).json({
        otp: otpToSend.otp,
        message: "OTP Generated Successfully",
        data: createWallet,
      });
    } else {
      const otpGen = newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });
      userexists.otp = otpGen;
      const updatedUser = await userexists.save();
      console.log(updatedUser);

      return res.status(200).json({
        OTP: otpGen,
        message: "OTP sent successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getuserById = async (req, res) => {
  try {
    const user = await userSchema.findById({ _id: req.params.id });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAlluser = async (req, res) => {
  try {
    const user = await userSchema.find();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const aws = require("aws-sdk");
// // s3 and cloud stodare
// //  step1: multer will be used to get access to the file in nodejs( from previous session learnings)
// //  step2:[BEST PRACTISE]:- always write s2 upload function separately- in a separate file/function..exptect it to take file as input and return the uploaded file as output
// // step3: aws-sdk install - as package
// // step4: Setupconfig for aws authenticcation- use code below as plugin keys that are given to you
// //  step5: build the uploadFile funciton for uploading file- use code below and edit what is marked HERE only

// //PROMISES:-
// // -you can never use await on callback..if you awaited something , then you can be sure it is within a promise
// // -how to write promise:- wrap your entire code inside: "return new Promise( function(resolve, reject) { "...and when error - return reject( err )..else when all ok and you have data, return resolve (data)

// aws.config.update({
//   accessKeyId: "AKIASRY3AQTBAV37WSW7",
//   secretAccessKey: "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",
//   region: "ap-south-1",
// });

// let uploadFile = async (file) => {
//   return new Promise(function (resolve, reject) {
//     // this function will upload file to aws and return the link
//     let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

//     var uploadParams = {
//       ACL: "public-read",
//       Bucket: "classroom-training-bucket", //HERE
//       Key: "abc/" + file.originalname, //HERE
//       Body: file.buffer,
//     };

//     s3.upload(uploadParams, function (err, data) {
//       if (err) {
//         return reject({ error: err });
//       }

//       //console.log(uploadParams)
//       // console.log("file uploaded succesfully")
//       return resolve(data.Location);
//     });

//     // let data= await s3.upload( uploadParams)
//     // if( data) return data.Location
//     // else return "there is an error"
//   });
// };

// // router.post("/write-file-aws", async function(req, res){

// //     try{
// //         let files= req.files
// //         if(files && files.length>0){
// //             //upload to s3 and get the uploaded link
// //             // res.send the link back to frontend/postman
// //             let uploadedFileURL= await uploadFile( files[0] )
// //             res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
// //         }
// //         else{
// //             res.status(400).send({ msg: "No file found" })
// //         }
// //     }
// //     catch(err){
// //         res.status(500).send({msg: err})
// //     }

// // })

// module.exports = { uploadFile };

//---creating data---//
// let savedData = await bookModel.create(data);
/////////////////////////////////////////////////////////////////////

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;

// // configure Cloudinary credentials
// cloudinary.config({
//   cloud_name: "dbrvq9uxa",
//   api_key: "567113285751718",
//   api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
// });

// // configure multer to use Cloudinary as storage destination
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "Images", // optional folder name in your Cloudinary account
//     allowed_formats: ["jpg", "jpeg", "png","PNG"], // optional array of allowed image formats
//   },
// });

// // create multer instance with storage configuration
// const upload = multer({ storage: storage });


// const path = require("path");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// // create s3 instance using S3Client
// // (this is how we create s3 instance in v3)
// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: "AKIASRY3AQTBAV37WSW7",
//     secretAccessKey: "S07hsgAHLhYa6YJ/IWKZxwbRKlTEN8XZd2JWJ852",
//   },
//   region: "ap-south-1", // e.g. "us-west-1"
// });

// // Set up multer storage with multerS3
// const s3Storage = multerS3({
//   s3: s3, // s3 instance
//   bucket: "flyweisimages", // change it as per your project requirement
//   ContentType: ["image/jpeg", "image/png", "image/jpg"],
//   acl: "public-read", // storage access type
//   metadata: (req, file, cb) => {
//     cb(null, { fieldname: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     const fileName = Date.now() + "" + file.fieldname + "" + file.originalname;
//     cb(null, fileName);
//   },
// });

// // Define middleware to sanitize the uploaded file
// function sanitizeFile(file, cb) {
//   // Define the allowed extension
//   const fileExts = [".png", ".jpg", ".jpeg"];

//   // Check allowed extensions
//   const isAllowedExt = fileExts.includes(
//     path.extname(file.originalname.toLowerCase())
//   );

//   // Mime type must be an image
//   const isAllowedMimeType = file.mimetype.startsWith("image/");

//   if (isAllowedExt && isAllowedMimeType) {
//     return cb(null, true); // no errors
//   } else {
//     // pass error msg to callback, which can be displayed in the frontend
//     const err = new Error(
//       file.mimetype +
//         " image is not allowed. Only jpg, png and jpeg format allowed!"
//     );
//     return cb(err);
//   }
// }

// // Define middleware to handle image upload
// const uploadImage = multer({
//   storage: s3Storage,
//   ContentType: ["image/jpeg" || "image/png" || "image/jpg"],
//   acl: "public-read",
//   fileFilter: (req, file, callback) => {
//     sanitizeFile(file, callback);
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 10, // 10mb file size
//   },
// }).single("image");

// Handle POST request to upload image
// exports.updateUser = async (req, res) => {
//   try {
//     uploadImage(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ msg: err.message });
//       }
//       console.log(req.file);

//       // Get the URL of the uploaded file
//       const fileUrl = req.file.location;

//       const {
//         name,
//         phoneNumber,
//         role,
//         gender,
//         email,
//         birth,
//         city,
//         website,
//         ishero,
//         status,
//         wallet,
//         rating,
//         profile,
//       } = req.body;

//       console.log(req.file);
//       const user = await userSchema.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $set: {
//             name,
//             phoneNumber,
//             role,
//             gender,
//             email,
//             birth,
//             city,
//             website,
//             ishero,
//             status,
//             wallet,
//             rating,
//             profile: req.file.location || profile,
//             /// profile: req.file ? uploadedFileURL : profile,
//           },
//         },
//         { new: true }
//       );

//       if (user) {
//         return res
//           .status(200)
//           .json({ msg: "profile details updated", data: user ,/*fileUrl:fileUrl*/});
//       } else {
//         return res.status(400).json({ msg: "something went wrong" });
//       }

//     });
//   } catch (error) {
//     return res.status(400).json({ msg: error.message, name: error.name });
//   }
// }






const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// // configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});

// configure multer to use Cloudinary as storage destination
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Images", // optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "PNG"], // optional array of allowed image formats
  },
});

// create multer instance with storage configuration
const upload = multer({ storage: storage });

exports.updateUser = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }

      // Get the URL of the uploaded file
      const fileUrl = req.file.path;

      const {
        name,
        phoneNumber,
        role,
        gender,
        email,
        birth,
        city,
        website,
        ishero,
        status,
        wallet,
        rating,
        profile,
      } = req.body;

      const user = await userSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name,
            phoneNumber,
            role,
            gender,
            email,
            birth,
            city,
            website,
            ishero,
            status,
            wallet,
            rating,
            profile: fileUrl || profile,
          },
        },
        { new: true }
      );

      if (user) {
        return res
          .status(200)
          .json({ msg: "Profile details updated", data: user });
      } else {
        return res.status(400).json({ msg: "Something went wrong" });
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};







// const path = require("path");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const { S3Client } = require("@aws-sdk/client-s3");

// // create s3 instance using S3Client
// // (this is how we create s3 instance in v3)
// const s3 = new S3Client({
//   credentials: {
//     // accessKeyId: "AKIAYWJWRO2ITUJL4R5J",
//     // secretAccessKey: "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",
//     accessKeyId: "AKIASRY3AQTBAV37WSW7",
//     secretAccessKey: "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",
//   },
//   region: "ap-south-1", // this is the region that you select in AWS account
// });
// const s3Storage = multerS3({
//   s3: s3, // s3 instance
//   bucket: "flyweisimages", // change it as per your project requirement
//   ContentType: ["image/jpeg", "image/png", "image/jpg"],
//   acl: "public-read", // storage access type
//   metadata: (req, file, cb) => {
//     cb(null, { fieldname: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     const fileName = Date.now() + "" + file.fieldname + "" + file.originalname;
//     cb(null, fileName);
//   },
// });
// function sanitizeFile(file, cb) {
//   // Define the allowed extension
//   const fileExts = [".png", ".jpg", ".jpeg"];

//   // Check allowed extensions
//   const isAllowedExt = fileExts.includes(
//     path.extname(file.originalname.toLowerCase())
//   );

//   // Mime type must be an image
//   const isAllowedMimeType = file.mimetype.startsWith("image/");

//   if (isAllowedExt && isAllowedMimeType) {
//     // console.log("file is supported");
//     return cb(null, true); // no errors
//   } else {
//     // pass error msg to callback, which can be displaye in frontend
//     const err = new Error(
//       file.mimetype +
//         " image is not allowed. Only jpg, png and jpeg  format allowed!"
//     );
//     return cb(err);
//   }
// }

// // our middleware
// const uploadImage = multer({
//   storage: s3Storage,
//   ContentType: ["image/jpeg" || "image/png" || "image/jpg"],
//   acl: "public-read",
//   fileFilter: (req, file, callback) => {
//     sanitizeFile(file, callback);
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 10, // 10mb file size
//   },
// });

// module.exports = uploadImage;


    // upload.single("Images")(req, res, async (err) => {
    //   if (err) {
    //      console.log("hi")
    //     return res.status(400).json({ msg: err.message });
    //   }
    // const image = uploadImage.single("image")(req, res, async (err) => {
    //   if (err) {
    //     console.log("hi");
    //     return res.status(400).json({ msg: err.message });
    //   }
    //   console.log(image)

//       const {
//         name,
//         phoneNumber,
//         role,
//         gender,
//         email,
//         birth,
//         city,
//         website,
//         ishero,
//         status,
//         wallet,
//         rating,
//         profile,
//       } = req.body;

//       console.log(req.file);
//       const user = await userSchema.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $set: {
//             name,
//             phoneNumber,
//             role,
//             gender,
//             email,
//             birth,
//             city,
//             website,
//             ishero,
//             status,
//             wallet,
//             rating,
//             profile: req.file.location || profile,
//             /// profile: req.file ? uploadedFileURL : profile,
//           },
//         },
//         { new: true }
//       );

//       if (user) {
//         return res
//           .status(200)
//           .json({ msg: "profile details updated", data: user });
//       } else {
//         return res.status(400).json({ msg: "something went wrong" });
//       }
//     }
//    catch (error) {
//     return res.status(400).json({ msg: error.message, name: error.name });
//   }
// };




module.exports.update_customer_to_hero1 = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userSchema.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const rolesToAdd = ['user', 'hero']
    // user.role = { $addToSet: { $each: rolesToAdd } }
    user.role = ["user", "hero"];
    user.ishero = true;

    const updatedUser = await user.save();
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOTPById = async (req, res) => {
  try {
    const user = await userSchema.findById({ _id: req.params.id });
    console.log(user.otp);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ otp: user.otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
