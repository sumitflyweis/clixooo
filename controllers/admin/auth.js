// const users = require('../../models/User')
// const jwt = require('jsonwebtoken')



//  const Auth = async(req,res,next)=>{
//     try {
//         const header = req.headers['authorization']
//         const token = header && header.split(' ')[1]
       
//         if (token == null) {
//             return res.status(400).json({ msg: "unauthorized" })
//         }
//         const verifyToken = jwt.verify(token, process.env.KEY)
//         console.log(verifyToken)
//         if (verifyToken) {
//             const user = await users.findOne({ _id: verifyToken._id})
//             if (!user) {
//                 return res.status(400).json({ msg: "verification Failed" })
//             }
//             req.user = user
//             next()
//         } else {
//             return res.status(400).json({ msg: "Invalid Token" })
//         }
//     } catch (error) {
//         return res.status(400).json({ err: error.message })

//     }
//  }

//  module.exports = {Auth}