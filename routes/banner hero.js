const express = require("express");
const landControllers = require("../controllers/admin/banner hero");
const landControllers2 = require("../controllers/hero/banner hero");
//const verifyToken = require('../middleware/auth_check')

const heroBannerRouter = express.Router();

// heroBannerRouter.post("/addlandtoBanner", [
//   /*verifyToken.veriftToken, */ landControllers.addlandtoBanner,
// ]);
heroBannerRouter.post("/addHeroBanner", [
  /*verifyToken.veriftToken, /*landControllers.uploadImgofhero,*/ landControllers.addlandtohero,
]);
heroBannerRouter.get("/land1", [
  /*verifyToken.veriftToken, */ landControllers.getland,
]);
heroBannerRouter.get("/land/:id", [
  /*verifyToken.veriftToken,*/ landControllers.getlandById,
]);
heroBannerRouter.put("/land/:id", [
  /*verifyToken.veriftToken,*/ landControllers.landUpdate,
]);
heroBannerRouter.delete("/land/:id", [
  /*verifyToken.veriftToken, */ landControllers.Deleteland,
]);
heroBannerRouter.get("/landcustomer", [
  /*verifyToken.veriftToken, */ landControllers2.getland,
]);
heroBannerRouter.get("/landcustomer/:id", [
  /*verifyToken.veriftToken,*/ landControllers2.getlandById,
]);

module.exports = heroBannerRouter;
