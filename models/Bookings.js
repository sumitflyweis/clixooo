const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({

    // service:{type:mongoose.SchemaTypes.ObjectId, ref:'service'},
    // bookingid:{type:String},

    // date:{type:Date, require:true},

    // time:{type:String},

    // user:{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref:'user'
    // }

    
    cancellable:{type:Boolean},
    booked:{type:Boolean},
   serviceId:{type:mongoose.SchemaTypes.ObjectId,ref:'service'},
   userId:{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
   location:{type:String},
   Date:{type:Date},
   categoryid:{type:mongoose.SchemaTypes.ObjectId,ref:'category'},
   heroid:{type:mongoose.SchemaTypes.ObjectId,ref:'hero'},
   category:{type:String},
   Time:{type:String},
   Status:{type:String}



})

module.exports= mongoose.model('bookings', bookingSchema)