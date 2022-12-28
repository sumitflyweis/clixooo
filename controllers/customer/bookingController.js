const bookings = require('../../models/Bookings')
const userSchema= require('../../models/User')
const heroSchema = require('../../models/hero')
const categorySchema = require('../../models/category')
const serviceSchema = require('../../models/services')

module.exports.bookService = async(req,res)=>{
    try {
        const {serviceId,userId,heroid,categoryid,cancellable,booked} = req.body
       
            //  const user=await  userSchema.findById({_id:userId})
            //  const hero=await heroSchema.find({_id:heroid})
            //  const category=await categorySchema.find({_id:categoryid}) 
            //  const service=await serviceSchema.find({_id:serviceId})
            //  let UserName=user.name 
        
            //  let HeroName=hero.name
            //  let CategoryName=category.name
            //  let ServiceName=service.name
            // if(user && hero && category && service){
           
             const booking =  await bookings.create({userId,heroid,categoryid,serviceId,cancellable,booked})
             console.log(booking)
            //  const data = {
            //     Name : UserName,   
            //     Hero: HeroName,
            //     Category:CategoryName,
            //    Service: ServiceName,   
            //    // Booking : booking
            //  }
            //  return res.status(200).json(/*msg:"booking scheduled"*/data)
            //   booking.UserName=name1
            //  booking.HeroName=hero1
            //  booking.CategoryName=category1
            //  booking.ServiceName=service1 
 
    //         //const booking =  await bookings.create({serviceId,userId,cancellable,booked})
                if(booking){
                return res.status(200).json({msg:"booking scheduled",data:booking})
            }else{
                return res.status(400).json({msg:"Booking not completed, please try again"})
            
       // } 
    } 
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
    }
}
