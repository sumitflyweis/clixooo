const express = require('express')
const {  gethero2,gethero3,getherorole4,addherobyadmin,update_customer_to_heroby_admin,changeStatusbyid,deleteheroByIdinadmin,getherobyid,update_gethero3_admin,update_editHero_admin} = require('../controllers/admin/heroController')
const { gethero,gethero1,getherorole,gethero3InCustomer,getheroWhoAccepted,update_gethero3_toRaisePrice} = require('../controllers/customer/heroController')
const {heroService,addhero ,loginhero,verifySignInhero , updateHero} = require('../controllers/hero/heroController')
const heroRouter = express.Router()

heroRouter.post('/create',heroService)
heroRouter.post('/loginhero',loginhero)
heroRouter.post('/verifySignInhero',verifySignInhero)
heroRouter.put('/updateHero/:id',updateHero)
heroRouter.get('/get',gethero)  
heroRouter.get('/get1',gethero1)
heroRouter.get('/getherorole1',getherorole)//update_gethero3_admin
heroRouter.get('/get2',gethero2)  
heroRouter.get('/get3/:price/:name',gethero3)
heroRouter.get('/getherorole4',getherorole4)//update_editHero_admin
heroRouter.put('/update_editHero_admin/:id',update_editHero_admin)
heroRouter.put('/update_gethero3_admin/:price/:name',update_gethero3_admin)//
heroRouter.put('/update_gethero3_toRaisePrice/:ActualPrice/:name',update_gethero3_toRaisePrice)
heroRouter.get('/gethero3InCustomer/:name/:ActualPrice',gethero3InCustomer)
heroRouter.get('/getheroWhoAccepted',getheroWhoAccepted)
//

heroRouter.post('/addherobyadmin',addherobyadmin)
heroRouter.post('/addhero',addhero)
heroRouter.get('/getherobyid/:id',getherobyid)
heroRouter.put('/update_customer_to_heroby_admin/:id',update_customer_to_heroby_admin)
heroRouter.put('/changeStatusbyid_by_dmin/:id',changeStatusbyid)
heroRouter.delete('/deleteheroByIdinadmin/:id',deleteheroByIdinadmin)
//addherobyadmin changeStatusbyid deleteheroByIdinadmin

module.exports =heroRouter