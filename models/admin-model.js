const mongoose = require('mongoose'); 


const AdminSchema   = mongoose.Schema({
    name: {
        type: String, 
    }, 
    email: {
        type: String,
        unique: true
    }, 
    phoneNumber:{
        type:String
    },
    password: {
        type: String, 

    }
   
})

const AdminModel = mongoose.model('adminProfile', AdminSchema); 

module.exports = AdminModel;