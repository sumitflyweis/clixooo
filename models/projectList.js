const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({

    booked:{type:Boolean},
   bookingId:{type:mongoose.SchemaTypes.ObjectId,ref:'bookings'},

})

module.exports= mongoose.model('projectList', projectSchema)