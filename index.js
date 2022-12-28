const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();
const bodyparser = require("body-parser");
const userRouter = require("./routes/userroutes");
const serviceRouter = require("./routes/services");
const categoryRouter = require("./routes/category");
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
const multerRouter=require("./routes/banner")

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
app.use("/multerRouter",multerRouter)
//app.use('/',route)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Images");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg, .jpeg, .png,.pdf");
    },
  }),
}).single("image");
app.post("/upload", upload, (req, res) => {
  res.send("file upload");
});
app.get("/upload1", upload, (req, res) => {
  res.send("file upload1");
});
app.delete("/upload2", upload, (req, res) => {
  res.send("file upload2");
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
