const mongoose = require('mongoose')

const blockuserSchema = mongoose.Schema({
   userid :{type:mongoose.SchemaTypes.ObjectId, ref:'user'},
    block:{type:Boolean}
})

module.exports = mongoose.model('blockuser', blockuserSchema)