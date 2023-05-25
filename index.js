const express = require("express");
const mongoose = require("mongoose");  
const cors = require("cors");
const multer = require("multer");
const app = express();
const bodyparser = require("body-parser");
const serverless = require('serverless-http')
const userRouter = require("./routes/userroutes");
const serviceRouter = require("./routes/services");
const categoryRouter = require("./routes/category");
const combinedservicesAndcategoryRouter = require("./routes/combinedservicesAndcategory");
const bookingRouter = require("./routes/bookings");
const heroRouter = require("./routes/hero");
const walletRouter = require("./routes/wallet");
const termsRouter = require("./routes/terms-condition");
const helpRouter = require("./routes/help-support");
const customertohero_Router = require("./routes/customer-to-hero");
const heroratingRouter = require("./routes/hero-rating");
const heroprivacypolicyRouter = require("./routes/heroprivacypolicy");
const helpandsupportRouter = require("./routes/helpandsupportforhero");
const blockuserRouter = require("./routes/blockuser");
const adminmodelRouter = require("./routes/admin-model");
const projectListRouter = require("./routes/projectList");
const userBannerRouter=require("./routes/banner user")
const heroBannerRouter=require("./routes/banner hero")
const coupencodeRouter=require("./routes/coupencode")
const notificationRouter=require("./routes/notification")
const cityRouter=require("./routes/city")
const paymentRouter=require("./routes/payment")
const revenue = require("./routes/revenue")


// app.use(multer().any())
//const route=require('./routes/banner')

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5002;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Db conneted succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", userRouter);
app.use("/api/services", serviceRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/combinedservicesAndcategoryRouter", combinedservicesAndcategoryRouter);
app.use("/api/heros", heroRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/terms", termsRouter);
app.use("/api/help", helpRouter);
app.use("/api/customertohero_Router", customertohero_Router);
app.use("/api/heroratingRouter", heroratingRouter);
app.use("/heroprivacypolicyRouter", heroprivacypolicyRouter);
app.use("/api/helpandsupportRouter", helpandsupportRouter);
app.use("/blockuserRouter", blockuserRouter);
app.use("/adminmodelRouter", adminmodelRouter);
app.use("/projectListRouter", projectListRouter);
app.use("/userBannerRouter",userBannerRouter)
app.use("/heroBannerRouter",heroBannerRouter)
app.use("/coupencodeRouter",coupencodeRouter)
app.use("/notificationRouter",notificationRouter)
app.use("/cityRouter",cityRouter)
app.use("/paymentRouter",paymentRouter)
app.use("/revenue",revenue)


function errorHandler(err, req, res, next) {
  console.error(err.stack); // log the error to the console

  // check if the error has a custom message
  const errorMessage = err.message || "Something went wrong!";

  // send an error response to the client with the custom message
  res.status(500).json({ message: errorMessage });
}
module.exports = errorHandler;



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app)
}