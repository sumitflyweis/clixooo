const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({

    name:{type:String}
})

module.exports = mongoose.model('service', serviceSchema)