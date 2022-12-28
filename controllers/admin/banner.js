//const multer = require('multer')
const land = require('../../models/banner');
const multer  = require('multer');
exports. upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,"Images")
        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname+"-"+Date.now()+"jpg, jpeg, png,pdf")
        }
    })
}).single("image")              


const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, './Images');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

exports.uploadImg = multer({storage: storage}).single('image');



exports.addland = async(req, res) => {
    try{
    const data = {
        image: req.file.path, 
        size: req.body.size,
        place: req.body.place,
        price: req.body.price
    }
    console.log(data)
  const landData = await land.create(data)
    res.status(200).json({
        message: "Land Added ", 
        details : landData
    })
}catch(err){
    console.log(err);
    res.status(400).json({
        message: err.message
    })

}
}

exports.getlandById = async (req, res) => {
    try {
        const landDetails = await land.findById({ _id: req.params.id });
        console.log(landDetails);
        res.status(200).json({
            details: landDetails
        })
    } catch (err) {
        console.log(err);
    }
}


exports.getland = async (req, res) => {
    try {
        const alland = await land.find();
        console.log(alland);
        res.status(200).json({
            message: "All lands ",
            Data: alland
        })  
    } catch (err) {
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }
}

exports.Deleteland = async (req, res) => {
    try {
        const id = req.params.id;
        await land.deleteOne({ _id: id });
        res.status(200).send({ message: "land  deleted " })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}

exports.landUpdate = async (req, res) => {
    try {
        const UpdatedData = await land.findOneAndUpdate({ _id: req.params.id }, {
        size: req.body.size,
        place: req.body.place,
        price: req.body.price
        }).exec();
        console.log(UpdatedData);
        res.status(200).send({ message: "land Updated  " })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}
