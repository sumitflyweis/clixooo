const bookings = require('../../models/Bookings')
// const userSchema= require('../../models/User')
// const heroSchema = require('../../models/hero')

// const combinedSchema = require("../../models/combineservicesAndcategory");


module.exports.getbookingsbyadmin = async(req,res)=>{
    try {
      
       const services= await bookings.find()
       console.log(services)
        if(!services || services.length==0 ){
            return res.status(400).json({msg:"No services added"})
          
        }else{
           
            return res.status(200).json(services)
        }
    } catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
        
    }
   
}



module.exports.updatebook = async(req,res)=>{

    try {
        let {id}=req.params
 //console.log(update)
        if(!id || id.length<24)return res.status(400).json("invalid userid")
        const user1 = await bookings.findById({_id:id})
       // console.log(user1)
       
         if( user1.cancellable==true){ 
      
            const user = await bookings.findOneAndUpdate({_id:id},{booked:false},{new:true})
             console.log(user)
             return res.status(200).json(user)
         }else{
         
           return res.status(200).json(user1)
         }
     }
  catch (error) {
        return res.status(400).json({msg:error.message, name:error.name})
    }
}


exports.getbookingbyid = async (req, res) => {
    try {
      const booking = await bookings.findById(req.params.id);
      if (!booking) {
        return res.status(400).json({
          message: "booking not found",
        });
      }
      return res.status(200).json({
        message: "booking found",
        data: booking,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        message: "internal server error",
      });
    }
  };



exports.deletebookingbyadmin = async(req,res) => {
    try {
    const id = req.params.id; 
    await categorySchema.deleteOne({_id: id});
    res.status(200).send({message: "category deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}



exports.changeStatusbyIdBooking = async (req, res) => {
  try {
    const data=await bookings.findOne({_id:req.params.id})
   console.log(data)
   console.log(data.Status)
    if(data.Status=="pending" && data.cancellable==false){
      data.Status="success"
      await data.save()
      console.log(data)
       }else{
      data.Status="ongoing"
      await data.save()
    }
    //console.log( data)
    const changestatus = await bookings.findByIdAndUpdate(
      { _id: req.params.id },
      {data},
      { new: true }
    );
    if (!changestatus) {
      return res.status(400).json({
        message: "status not found",
      });
    }
    return res.status(200).json({
      message: "status found",
      data: changestatus,
    });
  } catch (err) {
    console.log(err.message);
 return  res.status(500).json({
      message: "internal server error",
    });
  }
};



exports.getbookingbyidbycustomerbyAdmin = async (req, res) => {
  try {
    const booking = await bookings.find({userId: req.params.id });
    if (!booking) {
      return res.status(400).json({
        message: "booking not found",
      });
    }
    return res.status(200).json({
      message: "booking found",
      data: booking,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};



exports.getbookingbyidbyHeroIdbyAdmin= async (req, res) => {
  try {
    const booking = await bookings.find({ heroId: req.params.id });
    if (!booking || booking.length == 0) {
      return res.status(400).json({
        message: "booking not found",
      });
    }
    return res.status(200).json({
      message: "booking found",
      data: booking,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};


