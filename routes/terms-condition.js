const express = require('express'); 
const terms = require('../controllers/admin/terms-condition');
const terms1 = require('../controllers/customer/terms-condition');
//const verifyToken = require('../middleware/auth_check')

const termsRouter = express.Router()



termsRouter.post('/terms',   terms.addterms);
termsRouter.get('/terms1',   terms1.getterms);  
termsRouter.put('/terms/:id', terms.updateterms);
termsRouter.delete('/terms/:id', terms.DeleteTerms);
termsRouter.get('/gettermsbyadmin', terms.gettermsbyadmin);



module.exports = termsRouter;