const mongoose = require("mongoose"); 

const heroratingSchema = mongoose.Schema({
    idhero:{type:mongoose.SchemaTypes.ObjectId,ref:'hero'},
    iduser:{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    rating: {type:Number},
    data1:{}
})



const herorating  = mongoose.model('herorating', heroratingSchema);

module.exports = herorating