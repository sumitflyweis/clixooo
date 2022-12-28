const mongoose = require("mongoose"); 

const helpSchema = mongoose.Schema({
    email: {
        type: String
    },
    name:{type:String}
})



const help  = mongoose.model('help', helpSchema);

module.exports = help