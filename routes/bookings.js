const express = require('express')
const { Auth } = require('../controllers/admin/auth')
const { getbooking,updatebook} = require('../controllers/admin/bookingController')
const { bookService } = require('../controllers/customer/bookingController')
const bookingRouter = express.Router()


bookingRouter.post('/book', /*Auth*/  bookService)
bookingRouter.get('/getbook', /*Auth*/  getbooking)
bookingRouter.put('/updatebook/:update', /*Auth*/  updatebook)

module.exports = bookingRouter
