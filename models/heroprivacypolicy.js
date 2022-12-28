const mongoose = require("mongoose"); 

const heroprivacySchema = mongoose.Schema({
   data:{type:String}
})



const heroprivacy  = mongoose.model('heroprivacy', heroprivacySchema);

module.exports = heroprivacy