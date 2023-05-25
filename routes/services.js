const express = require("express");
const {
  addService,
  getservicebyadmin,
  updateservicesinadmin,
  getserviceById_Byadmin,
  deleteservicesByIdinadmin,
} = require("../controllers/admin/serviceController");
const {
  getServices,
  getServicesById,
  getServicesByName,
} = require("../controllers/customer/serviceController");
const serviceRouter = express.Router();

serviceRouter.post("/add", addService);
serviceRouter.get('/get', getServices)
serviceRouter.get('/id/:id', getServicesById)
serviceRouter.get('/name', getServicesByName)
serviceRouter.get("/getservicebyadmin/:id", getservicebyadmin);
serviceRouter.get("/getserviceById_Byadmin/:id", getserviceById_Byadmin);
serviceRouter.put("/updateservicesinadmin/:id", updateservicesinadmin);
serviceRouter.delete( "/deleteservicesByIdinadmin/:id", deleteservicesByIdinadmin);
 
 module.exports = serviceRouter;
