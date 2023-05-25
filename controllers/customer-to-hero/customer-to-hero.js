const customer_to_hero = require('../../models/customer-to-hero')
const userSchema = require('../../models/User');



module.exports.update_customer_to_hero = async (req, res) => {

    try {
        const id = req.params.id
        console.log(id)

        const user = await userSchema.findOneAndUpdate(id,
            { $push: { role: "hero" } }
            , { new: true })

        if (user) {
            return res.status(200).json({ msg: "profile details updated", data: user })
        } else {
            return res.status(400).json({ msg: "something went wrong" })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message, name: error.name })
    }
}



// module.exports.create_customer_to_hero = async (req, res) => {

//     try {
//        // const role = req.body.role 
       
//           // const role=req.body.role
//         const user = await userSchema.find({ role: "hero" } )
//         // console.log(user)   

//     //    customer_to_hero .push(user)
//     //    console.log(customer_to_hero)

//         if (user) {
//             const customer_to_hero1=await customer_to_hero.create(...user)
//            // console.log(customer_to_hero1)
//             return res.status(200).json({ msg: "profile details updated", data: customer_to_hero1 })
//         } else {
//             return res.status(400).json({ msg: "something went wrong" })
//         }
//     } catch (error) {
//         return res.status(400).json({ msg: error.message, name: error.name })
//     }
// }

