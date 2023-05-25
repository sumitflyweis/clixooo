const express = require('express'); 
const help = require('../controllers/admin/help-support');
const help1 = require('../controllers/customer/help-support');
//const verifyToken = require('../middleware/auth_check')
const help2= require('../controllers/hero/help-support');

const helpRouter = express.Router()



helpRouter.post('/help_add',   help.addterms);
helpRouter.get('/gethelpandsupportbyadmin',   help.gethelpandsupportbyadmin);
helpRouter.get('/help_get',   help1.getterms);
helpRouter.put('/help/:id', help.updateterms);
helpRouter.delete('/help/:id', help.DeleteTerms);
helpRouter.get('/help2',   help2.getterms);
//gethelpandsupportbyadmin


module.exports = helpRouter;