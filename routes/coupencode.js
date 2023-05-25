const express = require('express')
const { coupencodeService,getcoupencode,updatecoupencodeService,deletecoupencodeService} = require('../controllers/admin/coupencode')
const {  getcoupencodecustomer} = require('../controllers/customer/coupencode')
const {  getcoupencodehero} = require('../controllers/hero/coupencode')
const coupencodeRouter = express.Router()



coupencodeRouter.post('/coupencodeService',coupencodeService)
coupencodeRouter.put('/updatecoupencodeService',updatecoupencodeService)
coupencodeRouter.delete('/deletecoupencodeService/:id',deletecoupencodeService)
coupencodeRouter.get('/getcoupencode',getcoupencode)
coupencodeRouter.get('/getcoupencodecustomer',getcoupencodecustomer)
coupencodeRouter.get('/getcoupencodehero',getcoupencodehero)
  
module.exports =coupencodeRouter