const express = require('express')
const { addterms,updateprivacy,getprivacybyadmin,deleteprivacybyadmin} = require('../controllers/admin/heroprivacypolicy')
const { getterms} = require('../controllers/customer/heroprivacypolicy')
const { getterms1} = require('../controllers/hero/heroprivacypolicy')
const heroprivacypolicyRouter = express.Router()



heroprivacypolicyRouter.post('/create',addterms)
heroprivacypolicyRouter.put('/updateprivacy/:id',updateprivacy)
heroprivacypolicyRouter.get('/getprivacybyadmin',getprivacybyadmin)
heroprivacypolicyRouter.get('/get',getterms) 
heroprivacypolicyRouter.get('/get1',getterms1) //deleteprivacybyadmin
heroprivacypolicyRouter.delete('/delete1/:id',deleteprivacybyadmin)


module.exports =heroprivacypolicyRouter