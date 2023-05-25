const mongoose = require('mongoose')

const citySchema = mongoose.Schema({

    city:{type:String}
})

module.exports = mongoose.model('city', citySchema)