const mongoose = require("mongoose");
// const projectSchema = require('./projectList');

const heroSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    price: { type: Number },
    rating: { type: Number },
    guy: { type: String },
    ProfileImage: { type: String },
    Gender: { type: String },
    phoneNumber: { type: String },
    DateOfBirth: { type: String },
    Camera: { type: String },
    EquipmentSpecification: { type: String },
    gadgetside: {
      type: String,
    },
    gadgettop: {
      type: String,
    },
    gadgetfront: {
      type: String,
    },

    city: { type: String },
    Website: { type: String },
    wallet: { type: String, required: false },
    Preference: { type: String },
    Expertise: { type: String },
    driveringfront: {
      type: String,
    },
    driveringback: {
      type: String,
    },
    DrivingLicenseNumber: { type: String },
    TransferDataThrough: { type: String },
    ReadyToTravelOut: { type: String },
    WillingToTravelwithin_a_Radius_30_50KM: { type: String },
    Approve_Disapprove: { type: String },
    SelectSkill: { type: String },
    SelectExpertise: { type: String },
    OtherExpertise: { type: String },
    Aadhaafront: {
      type: String,
    },
    Aadhaaback: {
      type: String,
    },
    Howdoyoutransferdata: { type: String },
    status: { type: String, default: "pending" },
    message: [{ type: String }],
    category: { type: String },
    categoryStatus: {
      type: String,
         },
    on_off: { type: String },
    otp:{
      type:Number
    }
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hero", heroSchema);
