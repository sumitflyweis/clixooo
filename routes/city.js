const express = require('express')
const { postcity,getcity,getcitybyid,deletecity} = require('../controllers/admin/city')
const cityRouter = express.Router()

cityRouter.post('/postcity',postcity)
cityRouter.get('/getcity',getcity)
cityRouter.get('/getcitybyid/:id',getcitybyid)

cityRouter.delete('/deletepost/:id',deletecity)

module.exports =cityRouter