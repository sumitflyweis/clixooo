const mongoose = require('mongoose');

const landSchema = mongoose.Schema({
    image: {
        type: String, 
    }, 
    size: {
        type: String
    }, 
    place: {
        type: String
    },
    price:{
        type:String
    }
})

const land_model = mongoose.model('land', landSchema);

module.exports = land_model;