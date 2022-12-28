const express = require('express')
const {  gethero2,gethero3,getherorole4} = require('../controllers/admin/heroController')
const { gethero,gethero1,getherorole} = require('../controllers/customer/heroController')
const {heroService} = require('../controllers/hero/heroController')
const heroRouter = express.Router()



heroRouter.post('/create',heroService)
heroRouter.get('/get',gethero)  
heroRouter.get('/get1',gethero1)
heroRouter.get('/getherorole1',getherorole)
heroRouter.get('/get2',gethero2)  
heroRouter.get('/get3',gethero3)
heroRouter.get('/getherorole4',getherorole4)

module.exports =heroRouter