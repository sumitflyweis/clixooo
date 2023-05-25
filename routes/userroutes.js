const express = require('express')
const userRouter = express.Router()


const { register, login,verifySignIn,updateUser ,update_customer_to_hero1,getuserById,getAlluser,getOTPById ,uploadImage } = require('../controllers/customer/usercontroller')
const { getUser,updateUserinadmin,deleteuserByIdinadmin,getuserByIdinadmin } = require('../controllers/admin/usercontroller')
const { getYearwise,getMonthwise,getweekwise} = require('../controllers/admin/dataByWeekly,Monthly,weekly')


userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/getuserById/:id', getuserById)
userRouter.get('/getAlluser', getAlluser)
userRouter.get('/getOTPById/:id', getOTPById)
userRouter.post('/signIn', verifySignIn)
userRouter.put('/updateUser/:id'/*,uploadImage.single("Images")*/,updateUser)
userRouter.put('/update_customer_to_hero1/:id',update_customer_to_hero1)
userRouter.get('/getUser/:status',getUser)
userRouter.put('/updateUserinadmin/:id',updateUserinadmin)
userRouter.delete('/deleteuserByIdinadmin/:id',deleteuserByIdinadmin)
userRouter.get('/getuserByIdinadmin/:id',getuserByIdinadmin)
//userRouter.get('/getlastsevendaysuser',getlastsevendaysuser)
userRouter.get('/getMonthwise/:d',getMonthwise)//getYearwise
// userRouter.get('/getYearwise',getYearwise)
// userRouter.get('/getweekwise',getweekwise)//

module.exports = userRouter
