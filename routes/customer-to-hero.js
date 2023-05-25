const express = require('express'); 
const customer_to_hero = require('../controllers/customer-to-hero/customer-to-hero')
 const customer_to_hero1 = require('../controllers/admin/commonUser')
//const verifyToken = require('../middleware/auth_check')

const customertohero_Router = express.Router()



//customertohero_Router.post('/customertohero',   customer_to_hero.add_customer_to_hero);
customertohero_Router.get('/get_customer_to_hero',   customer_to_hero1. get_customer_to_hero);
customertohero_Router.put('/customertohero/:id', customer_to_hero.update_customer_to_hero);
//customertohero_Router.delete('/customertohero/:id', customer_to_hero.Delete_customer_to_hero);


module.exports = customertohero_Router;