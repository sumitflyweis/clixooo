const express = require('express')
const { Auth } = require('../controllers/admin/auth')
const { getbookingsbyadmin,updatebook,getbookingbyid,deletebookingbyadmin,changeStatusbyIdBooking,getbookingbyidbycustomerbyAdmin,getbookingbyidbyHeroIdbyAdmin,changeStatusbyidByAdmin} = require('../controllers/admin/bookingController')
const { bookService,getbookingsbycustomer,getbookingbyidbycustomer,getbookingbyidbyHeroId,getbookingsbyId,timer } = require('../controllers/customer/bookingController')
const bookingRouter = express.Router()

//CUSTOMER
bookingRouter.post('/book', /*Auth*/  bookService)
bookingRouter.get('/getbookingsbycustomer', /*Auth*/  getbookingsbycustomer)
bookingRouter.get('/getbookingbyidbycustomer/:id', /*Auth*/  getbookingbyidbycustomer)
bookingRouter.get('/getbookingbyidbyHeroId/:id', /*Auth*/  getbookingbyidbyHeroId)
bookingRouter.get('/getbookingsbyId/:id', /*Auth*/  getbookingsbyId)
// bookingRouter.get('/timer', /*Auth*/  timer)

//ADMIN
bookingRouter.get('/getbook', /*Auth*/  getbookingsbyadmin)
bookingRouter.put('/updatebook/:id', /*Auth*/  updatebook)
bookingRouter.get('/getbookingbyid/:id', /*Auth*/  getbookingbyid)
bookingRouter.delete('/deletebookingbyadmin/:id', /*Auth*/  deletebookingbyadmin)
bookingRouter.put('/changeStatusbyIdBooking/:id', /*Auth*/  changeStatusbyIdBooking)
bookingRouter.get('/getbookingbyidbycustomerbyAdmin/:id', /*Auth*/  getbookingbyidbycustomerbyAdmin)
bookingRouter.get('/getbookingbyidbyHeroIdbyAdmin/:id', /*Auth*/  getbookingbyidbyHeroIdbyAdmin)//



module.exports = bookingRouter
