const razerpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const payment = require("../../models/payment");
const booking = require("../../models/Bookings");

const Razorpay = new razerpay({
  key_id: "rzp_live_xhEiJ4uMcMKT1r",
  key_secret: "JSwRiz3kcqggnJSTohP1pJPy",
});

//
// const path = require("path");
// require("dotenv").config();
// const rasor = require("../../model/CustomerAccount");
// const bookNow = require("../../model/bookNow");
// const payment = require("../../model/payment");
// const razerpay = require('razorpay');
// const crypto = require('crypto')
// const uuid = require('uuid')
// const id = uuid.v4();
// //const payment = require('../models/payment_module');
// const Razorpay = new razerpay({
//     key_id: 'rzp_live_xhEiJ4uMcMKT1r',
//     key_secret: 'JSwRiz3kcqggnJSTohP1pJPy'
// })

// exports.CreatePaymentOrder = async (req, res) => {

//     try {
//         const bookingData = await bookNow.findById({_id: req.params.id});
//         if(!req.params.id){
//             return res.status(500).json({
//                 message: "bookingId is required"
//             })
//         }
//         console.log(bookingData.DiscountedPrice)

//         const data = {
//             amount: bookingData.DiscountedPrice,
//             currency: 'INR',
//             receipt: id,
//             partial_payment: false,
//         }
//         console.log(data)
//         const result = await Razorpay.orders.create(data);
//         console.log(result)

//         const DBData = {
//             bookingId: req.params.id,
//             user: bookingData,
//             invoice :"123" + req.body.name,
//             payment_Id: result.id,
//             amount: result.amount,
//             amount_paid: result.amount_paid,
//             receipt: result.receipt,

//         }
//         console.log(DBData)
//         bookingData.Status="success"
//        await bookingData.save()
//         const AmountData = await payment.create(DBData);
//         res.status(200).json({
//             details: AmountData
//         })

//     } catch (err) {
//         console.log(err);
//         res.status(400).send({ message: err.message })
//     }
// }
//

// exports.CreatePaymentOrder = async (req, res) => {
//   try {
//     const bookingData = await booking.findById({ _id: req.params.id });

//     if (!req.params.id) {
//       return res.status(500).json({
//         message: "bookingData id is required",
//       });
//     }
//     console.log(bookingData.userobject.wallet);
//     console.log(bookingData.heroobject._id);
//     console.log(bookingData.userobject._id);
    // const data1 = {
    //   amount: bookingData.userobject.wallet,
    //   currency: "INR",
    //   receipt: id,
    //   partial_payment: false,
    // };
    // console.log(data1);
    //     const result1 = await Razorpay.orders.create(data1);
    //     console.log(result1);

//     const DBData = {
//       name: req.body.name,
//       invoice: "123" + req.body.name,
//       amount: bookingData.userobject.wallet,
//       currency: "INR",
//       receipt: id,
//       partial_payment: false,
//       user:bookingData.userobject._id.toString(),
//       userName:bookingData.userobject.name,
//       hero:bookingData.heroobject._id.toString(),
//       heroName:bookingData.heroobject.name,
     
//       //  payment_Id: result1.id,
//       //  amount: result1.amount,
//       //  amount_paid: result1.amount_paid,
//       //  receipt: result1.receipt,
//       //  product: req.body.product,
//       status: req.body.status,
//     };
//     console.log(DBData);
//     const AmountData = await payment.create(DBData);
   
//     // const AmountData = await payment.create(data1);
//     bookingData.Status = "success";
//     bookingData.amount = bookingData.userobject.wallet ;
//     await bookingData.save();
//     return res.status(200).json({
//       details: AmountData,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ message: err.message });
//   }
// };

exports.getAllPayments = async (req, res) => {
  try {
    const Data = await payment.find();
  return  res.status(200).json({ details: Data });
  } catch (err) {
    console.log(err);
  return  res.state(400).json({
      message: err.message,
    });
  }
};

exports.GetPaymentsById = async (req, res) => {
  try {
    const Data = await payment.findById({ _id: req.params.id });
  return  res.status(200).json({ details: Data });
  } catch (err) {
 return   res.status(400).json({ message: err.message });
  }
};

exports.GetPaymentsByUserIdAdmin = async (req, res) => {
  try {
    const Data = await payment.find({user: req.params.user });
 return res.status(200).json({ details: Data });
  } catch (err) {
  return  res.status(400).json({ message: err.message });
  }
};



exports.changeStatusbyidByAdmin = async (req, res) => {
  try {
    const changestatus = await booking.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { Status: req.body.Status } },
      { new: true }
    );
    if (!changestatus) {
      return res.status(400).json({
        message: "status not found",
      });
    }
    return res.status(200).json({
      message: "status found",
      data: changestatus,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
