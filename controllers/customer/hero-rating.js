const herorating = require('../../models/hero-rating')
const userSchema= require('../../models/User')
const heroSchema = require('../../models/hero')


exports.addterms = async (req,res) =>{
    try{  
        let {iduser,idhero,rating}=req.body
        
        let hero={}
        if(iduser){
    const data1=  await userSchema.findOne({ $and: [ {_id:iduser }, { role:"hero"}  ] })
    
        console.log(data1)
        hero["rating"]=rating
      //  herorating["iduser"]=iduser
        hero["data1"]=data1
        
        // console.log(herorating)
         const data2=await herorating.create(hero)

         res.status(200).json({
            message: "data" ,data:data2})  
        }else{
          let data2=await heroSchema.findById({_id:idhero})
          console.log(data2)
          hero["rating"]=rating
          hero["data1"]=data2
          const data3=await herorating.create(hero)
          res.status(200).json({
            message: "data" ,data:data3})
          }
          }
    catch(err)
    {
        console.log(err);
        res.status(400).send({message: err.message})
    }
}



