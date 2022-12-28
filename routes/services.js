const express = require('express')
const { addService} = require('../controllers/admin/serviceController')
const {getServices,getServicesById,getServicesByName} = require('../controllers/customer/serviceController')
const serviceRouter = express.Router()


serviceRouter.post('/add', addService)
serviceRouter.get('/get', getServices)
serviceRouter.get('/id/:id', getServicesById)   
serviceRouter.get('/name', getServicesByName)


module.exports =serviceRouter