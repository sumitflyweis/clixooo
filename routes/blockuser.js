const express = require('express')
//const { Auth } = require('../controllers/adminapi/blockuser')
const { block ,getblock,getblock1} = require('../controllers/admin/blockuser')
const blockuserRouter = express.Router()


blockuserRouter.post('/block', /*Auth*/  block)
blockuserRouter.get('/getblock', /*Auth*/  getblock)
//blockuserRouter.put('getblock1', /*Auth*/  getblock1)

module.exports = blockuserRouter