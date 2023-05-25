const express = require('express')
const walletRouter = express.Router()

const walletContrallers = require("../controllers/admin/wallet");
const walletContrallers1 = require("../controllers/customer/wallet");
const walletContrallers2 = require("../controllers/hero/wallet");




walletRouter.post('/wallet', walletContrallers.createWallet);
walletRouter.post('/createWalletofhero', walletContrallers.createWalletofhero);
walletRouter.post('/addandremoveMoneyinadmin/:user', walletContrallers.addandremoveMoneyinadmin)
walletRouter.post('/addandremoveMoneyinadminofhero/:hero', walletContrallers.addandremoveMoneyinadminofhero)
walletRouter.post('/wallet/add', walletContrallers1.addMoney);
walletRouter.post('/wallet/remove', walletContrallers1.removeMoney);
walletRouter.get('/getwallet/:user', walletContrallers1.getWallet);
walletRouter.post('/createWalletbyhero', walletContrallers2.createWalletbyhero);
walletRouter.post('/addMoneybyhero', walletContrallers2.addMoneybyhero);
walletRouter.post('/removeMoneybyhero', walletContrallers2.removeMoneybyhero);
walletRouter.get('/getWalletByIdOfHero/:hero', walletContrallers.getWalletByIdOfHero);


module.exports =walletRouter




