const mongoose = require("mongoose"); 

const customer_to_heroSchema = mongoose.Schema({


    role:[{type:String,default:"user"}]
})

const customer_to_hero  = mongoose.model('customer_to_hero', customer_to_heroSchema);

module.exports = customer_to_hero