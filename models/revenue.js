const mongoose = require("mongoose"); 

const revenueSchema = mongoose.Schema({
   projectId:{type:String},
   customer:{type:String},
   hero:{type:String},
   service:{type:String},
  date:{type:String},
  time:{type:String},
  totalAmount:{type:Number},
  commission:{type:Number},
  earning:{type:Number},

})

const revenueModel  = mongoose.model('revenue', revenueSchema);

module.exports = revenueModel