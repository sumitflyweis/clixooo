const mongoose = require('mongoose'); 


const AdminSchema   = mongoose.Schema({
    name: {
        type: String, 
    }, 
    email: {
        type: String,
        unique: true
    }, 
    password: {
        type: String, 

    }
   
})

const AdminModel = mongoose.model('adminProfile', AdminSchema); 

module.exports = AdminModel;