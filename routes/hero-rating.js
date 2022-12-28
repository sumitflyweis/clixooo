const express = require('express'); 
const herorating = require('../controllers/customer/hero-rating');
const herorating1 = require('../controllers/admin/hero-rating');
const herorating2 = require('../controllers/hero/hero-rating');
//const herorating3 = require('../controllers/hero/hero-rating');


const heroratingRouter = express.Router()



heroratingRouter.post('/hero_add',   herorating.addterms);
heroratingRouter.get('/hero1',   herorating1.getterms);
heroratingRouter.put('/hero/:id', herorating1.updateterms);
heroratingRouter.delete('/hero/:id', herorating1.DeleteTerms);
heroratingRouter.get('/hero2',   herorating2.getterms);


module.exports = heroratingRouter;