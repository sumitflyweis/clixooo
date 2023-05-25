const express = require('express')
const { combineServiceAndcategory,getserviceById_Byadmin,getcombinedByadmin,updatecombinedbyadmin,deletecombinedbyID} = require('../controllers/admin/combineServicesAndController')
const {  getcategory} = require('../controllers/customer/categoryController')
const combinedservicesAndcategoryRouter = express.Router()



combinedservicesAndcategoryRouter.post('/create',combineServiceAndcategory)
combinedservicesAndcategoryRouter.get('/getserviceById_Byadmin/:id',getserviceById_Byadmin)
combinedservicesAndcategoryRouter.get('/getcombinedByadmin',getcombinedByadmin)
 combinedservicesAndcategoryRouter.put('/updatecombinedbyadmin/:id',updatecombinedbyadmin)
 combinedservicesAndcategoryRouter.delete('/deletecombinedbyID/:id',deletecombinedbyID)
 
// categoryRouter.put('/updatecategorybyadmin/:update',updatecategorybyadmin)
// // categoryRouter.delete('/deletecategorybyadmin/:id',deletecategorybyadmin)

module.exports =combinedservicesAndcategoryRouter