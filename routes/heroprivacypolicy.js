const express = require('express')
const { addterms} = require('../controllers/admin/heroprivacypolicy')
const { getterms} = require('../controllers/customer/heroprivacypolicy')
const { getterms1} = require('../controllers/hero/heroprivacypolicy')
const heroprivacypolicyRouter = express.Router()



heroprivacypolicyRouter.post('/create',addterms)
heroprivacypolicyRouter.get('/get',getterms) 
heroprivacypolicyRouter.get('/get1',getterms1) 


module.exports =heroprivacypolicyRouter