const bookings = require('../../models/Bookings')
 const projectList= require('../../models/projectList')
// const heroSchema = require('../../models/hero')
// const categorySchema = require('../../models/category')
// const serviceSchema = require('../../models/services')


module.exports. getProjects= async(req,res)=>{
    try {
        const {bookingId,booked}=req.body
       
      const book= await bookings.find({_id:bookingId,booked:booked})

        console.log(book)
        if(book){

            return res.status(200).json(book)
        }else{
            return res.status(400).json({msg:"No projects are there"})
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
}


