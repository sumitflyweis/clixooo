const mongoose = require('mongoose');

const landSchema = mongoose.Schema({
    image: {
        type: String,
        default:
          "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      }, 
    desc: {
        type: String
    },
    link: {
        type: String,
        default:
          "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
      },
})

const land_model = mongoose.model('banner user', landSchema);

module.exports = land_model;