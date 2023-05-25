const mongoose = require("mongoose"); 

const notificationSchema = mongoose.Schema({
   message:{type:String},
  
   role:{type:String}
 
})



const notification  = mongoose.model('notification', notificationSchema);

module.exports = notification