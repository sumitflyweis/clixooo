const express = require('express')
const { categoryService} = require('../controllers/admin/categoryController')
const {  getcategory} = require('../controllers/customer/categoryController')
const categoryRouter = express.Router()



categoryRouter.post('/shoot',categoryService)
categoryRouter.get('/getshoot',getcategory)

module.exports =categoryRouter