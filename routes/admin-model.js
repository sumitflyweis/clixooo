const express = require('express'); 
const {AdminProfile,AdminLogin,AdminUpdate,AllUsers} = require('../controllers/admin/admin-login');
//const verifyAdmin = require('../middleware/isAdmin')
//const verifyToken = require('../middleware/auth_check');

const adminmodelRouter = express.Router();


adminmodelRouter.post('/signup', AdminProfile);
adminmodelRouter.post('/login',  AdminLogin);
adminmodelRouter.get('/allusers',AllUsers);
adminmodelRouter.put('/update/:id',AdminUpdate);



module.exports = adminmodelRouter;