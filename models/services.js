const mongoose = require('mongoose')
const objectid = mongoose.Schema.Types.ObjectId
const serviceSchema = mongoose.Schema({

    service:{type:String},
    description:{type:String},
    categoryId:{type:[objectid],ref:'category'},
  // user:{type:Object},
       
})

module.exports = mongoose.model('service', serviceSchema)
