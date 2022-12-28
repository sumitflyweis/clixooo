const express = require('express')
const { addterms} = require('../controllers/admin/helpandsupportforhero')
const { getterms} = require('../controllers/customer/helpandsupportforhero')
const helpandsupportRouter = express.Router()



helpandsupportRouter.post('/create',addterms)
helpandsupportRouter.get('/get',getterms)  


module.exports =helpandsupportRouter