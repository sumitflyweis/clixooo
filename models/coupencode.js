const mongoose = require('mongoose')

const coupenSchema = mongoose.Schema({

    coupencode:{type:String},
    minimumAmount:{type:Number},
    activationdate:{type:String},
    expirydate:{type:String}


})

module.exports = mongoose.model('coupen', coupenSchema)