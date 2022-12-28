const express = require('express')
const userRouter = express.Router()


const { register, verifySignIn,updateUser } = require('../controllers/customer/usercontroller')
const { getUser } = require('../controllers/admin/usercontroller')

userRouter.post('/register', register)
userRouter.post('/signIn', verifySignIn)
userRouter.put('/updateUser',updateUser)
userRouter.get('/getUser',getUser)

module.exports = userRouter
