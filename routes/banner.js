const express = require('express');
const landControllers = require('../controllers/admin/banner');
//const verifyToken = require('../middleware/auth_check')


const multerRouter = express.Router(); 

multerRouter.post('/land', [/*verifyToken.veriftToken, */landControllers.uploadImg, landControllers.addland]);
multerRouter.get('/land1', [/*verifyToken.veriftToken, */landControllers.getland]);
multerRouter.get('/land/:id', [/*verifyToken.veriftToken,*/ landControllers.getlandById]);
multerRouter.put('/land/:id', [/*verifyToken.veriftToken,*/ landControllers.landUpdate]);
multerRouter.delete('/land/:id', [/*verifyToken.veriftToken, */landControllers.Deleteland]);

 


module.exports = multerRouter;