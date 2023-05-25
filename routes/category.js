const express = require('express')
const { categoryService,getcategorybyadmin,updatecategorybyadmin,deletecategorybyadmin,updatecategoryinServiceInAdmin} = require('../controllers/admin/categoryController')
const {  getcategory,getAllCategory} = require('../controllers/customer/categoryController')
const categoryRouter = express.Router()



categoryRouter.post('/shoot/',categoryService)
categoryRouter.get('/getshoot/:name',getcategory)
categoryRouter.get('/getAllCategory',getAllCategory)
categoryRouter.get('/getcategorybyadmin/:name',getcategorybyadmin)
categoryRouter.put('/updatecategorybyadmin/:id',updatecategorybyadmin)//getAllCategory
categoryRouter.put('/updatecategoryinServiceInAdmin/:id',updatecategoryinServiceInAdmin)
categoryRouter.delete('/deletecategorybyadmin/:id',deletecategorybyadmin)

module.exports =categoryRouter