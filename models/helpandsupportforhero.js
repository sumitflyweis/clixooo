const mongoose = require("mongoose"); 

const helpSchema = mongoose.Schema({
    email: {
        type: String
    },
    name:[]
})



const help  = mongoose.model('helpandsupportforhero', helpSchema);

module.exports = help