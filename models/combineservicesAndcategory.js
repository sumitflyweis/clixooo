const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({

    
        service:{type:String},
        category:{type:Object}
    

})

module.exports = mongoose.model('combined', categorySchema)