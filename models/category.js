const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const categorySchema = mongoose.Schema({

  name: { type: String },
  photoActual: { type: Number },
  photoExcepted: { type: Number },
  videoActual: {type: Number},
  videoExcepted: {type: Number},
  dronActual: {type: Number},
  dronExcepted: {type: String},
  desc:{
    type: String
  }
});

module.exports = mongoose.model("category", categorySchema);
