const express = require("express");
const landControllers = require("../controllers/admin/banner user");
const landControllers1 = require("../controllers/customer/banner user");

//const verifyToken = require('../middleware/auth_check')

const userBannerRouter = express.Router();

userBannerRouter.post("/addlandtoBanner", [
  /*verifyToken.veriftToken, */ landControllers.addlandtoBanner,
]);

userBannerRouter.get("/land1", [
  /*verifyToken.veriftToken, */ landControllers.getland,
]);
userBannerRouter.get("/land/:id", [
  /*verifyToken.veriftToken,*/ landControllers.getlandById,
]);
userBannerRouter.put("/land/:id", [
  /*verifyToken.veriftToken,*/ landControllers.landUpdate,
]);
userBannerRouter.delete("/land/:id", [
  /*verifyToken.veriftToken, */ landControllers.Deleteland,
]);
userBannerRouter.get("/landcustomer", [
  /*verifyToken.veriftToken, */ landControllers1.getland,
]);
userBannerRouter.get("/landcustomer/:id", [
  /*verifyToken.veriftToken,*/ landControllers1.getlandById,
]);

module.exports = userBannerRouter;
