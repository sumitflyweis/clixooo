const customer_to_hero = require('../../models/customer-to-hero')
const userSchema = require('../../models/User');




module.exports.get_customer_to_hero = async (req, res) => {

    try {
      
        const user = await userSchema.find({ role: "hero" } )
       
console.log(user)
        if (user) {
        
            return res.status(200).json({ msg: "profile details updated", data: user })
        } else {
            return res.status(400).json({ msg: "something went wrong" })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message, name: error.name })
    }
}


