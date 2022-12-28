const express = require('express')
const walletRouter = express.Router()

const walletContrallers = require("../controllers/admin/wallet");
const walletContrallers1 = require("../controllers/customer/wallet");




walletRouter.post('/wallet', walletContrallers.createWallet);
walletRouter.post('/wallet/add', walletContrallers1.addMoney);
walletRouter.post('/wallet/remove', walletContrallers1.removeMoney);
walletRouter.post('/getwallet', walletContrallers1.getWallet);


module.exports =walletRouter




