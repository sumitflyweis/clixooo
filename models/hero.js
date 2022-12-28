const mongoose = require('mongoose')

const heroSchema = mongoose.Schema({

    name:{type:String},
    price:{type:Number},
    rating:{type:Number},
    ProfileImage:{type:String},
    Gender:{type:String},
    phoneNumber:{type:String},
    DateOfBirth:{type:String},
    Camera:{type:String},
    EquipmentSpecification:{type:String},
    GadgetPhoto:{type:String},
    Website:{type:String},
    Preference:{type:String},
    Expertise:{type:String},
    DrivingLicense:{type:String},
    DrivingLicenseNumber:{type:String},
    AadharCard:{type:String},
    TransferDataThrough:{type:String},
    ReadyToTravelOut:{type:String},
    WillingToTravelwithin_a_Radius_30_50KM:{type:String},
    Approve_Disapprove:{type:String}
})

module.exports = mongoose.model('hero', heroSchema)