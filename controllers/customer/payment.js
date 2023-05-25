const razerpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const payment = require("../../models/payment");
const booking = require("../../models/Bookings");
const Wallet = require("../../models/wallet");
const userSchema = require("../../models/User");

const Razorpay = new razerpay({
  key_id: "rzp_live_oe2m9rifPN1OM5",
  key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
});

// API endpoint for payment by booking ID


exports.CreatePaymentOrder = async (req, res) => {
  try {
    const bookingData = await booking.findById({ _id: req.params.id }).populate('userId').populate('heroId');

console.log(bookingData)


    if (!bookingData || bookingData.length == 0) {
      return res.status(500).json({
        message: "No Booking  is their",
      });
    }
//console.log(bookingData)
  // try {
  //   const booking = await booking.findById(req.params.bookingId).populate('user');
  //   if (!booking) {
  //     return res.status(404).json({ message: 'Booking not found' });
  //   }

    const user = bookingData.userId;
    const hero = bookingData.heroId
    let walletBalance = bookingData.userId.wallet;
    const bookingAmount = bookingData.amount;

   console.log(user , hero ,walletBalance, bookingAmount)

    let paymentMethod;
    let paymentStatus;
    let paymentAmount;

    if (walletBalance >= bookingAmount) {
      // Payment using wallet balance
      paymentMethod = 'wallet',
      // paymentStatus = 'success';
      //status = "success",
      paymentAmount = bookingAmount;
     
      // Deduct booking amount from wallet balance
      //user.walletBalance -= bookingAmount;
      walletBalance -= bookingAmount;
      console.log(walletBalance)
    
      await userSchema.findByIdAndUpdate({_id:user._id},{ wallet:walletBalance },{new:true}) 

      bookingData.Status = 'confirmed';
    await bookingData.save();
    return res.status(200).send({msg:"payment successful"})

    }else {
      // Payment using Razorpay
      paymentMethod = 'razorpay';
    //  paymentStatus = 'pending';
      paymentAmount = bookingAmount - walletBalance;
      
      await userSchema.findByIdAndUpdate({_id:user._id},{ wallet: 0 },{new:true}) 

      // Generate a new order ID
      //const orderId = uuidv4();

      // Create a new Razorpay order
      const razorpayOrder = await Razorpay.orders.create({
        amount: paymentAmount * 100,
        currency: 'INR',
        // receipt: orderId,
        receipt: id,
        payment_capture: 1,
      });

//       // Update booking with Razorpay order ID
//       booking.razorpayOrderId = razorpayOrder.id;
//       await booking.save();

//       // Redirect user to Razorpay payment page
//       return res.status(200).json({
//         paymentUrl: razorpayOrder['short_url'],
//       });
//     }

    // Create payment object
    const Payment = new payment({
      payment_Id: razorpayOrder.receipt,
      amount: paymentAmount,
      invoice: booking.invoice,
      status: paymentStatus,
      receipt: /*uuidv4()*/id,
      amount_paid: paymentAmount,
      name: booking.name,
      //type: booking.type,
      date: new Date(),
      paymentMethod,
      //product: booking.product,
      orderStatus: 'confirmed',
      user: user._id,
      userName: user.name,
      hero: hero._id,
      heroName:hero.name,
      // orderId: id,
      orderId: razorpayOrder.id,
    });

    console.log(Payment)
    // Save payment object to database
    await Payment.save();

//     // Update booking with payment details
//     booking.payment_Id = payment.payment_Id;
//     booking.paymentAmount = payment.amount_paid;
//     booking.paymentDate = payment.date;
    bookingData.Status = 'confirmed';
    await bookingData.save();

    return res.status(200).json(Payment);
  }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}




// exports.CreatePaymentOrder = async (req, res) => {
//   try {
//     const bookingData = await booking.findById({ _id: req.params.id });

//     if (!bookingData || bookingData.length == 0) {
//       return res.status(500).json({
//         message: "No Booking  is their",
//       });
//     }

//     console.log(bookingData.amount);
//     const b = bookingData.amount;  
//     console.log(b);
//     console.log(bookingData.userId);
//     console.log(bookingData.heroId);
//     console.log(bookingData.userobject.wallet);

//     const userdata = await userSchema.findById({ _id: bookingData.userId });

//     if (!userdata || userdata.length == 0) {
//       return res.status(500).json({
//         message: "No userdata  is their",
//       });
//     }
//     console.log(userdata.wallet);

//     const walletdata = await Wallet.findOne({ user: bookingData.userId });
//     if (!walletdata || walletdata.length == 0) {
//       return res.status(500).json({
//         message: "No walletdata  is their",
//       });
//     }
//     console.log(walletdata);
//     console.log(walletdata.balance);

//     if (
//       bookingData.amount < walletdata.balance ||
//       (bookingData.amount = walletdata.balance)
//     ) {
//       console.log(parseInt(walletdata.balance));

//       const data1 = {
//         amount: bookingData.amount * 100,
//         currency: "INR",
//         receipt: id,
//         partial_payment: false,
//       };
//       console.log(data1.receipt);
//       const result1 = await Razorpay.orders.create(data1);
//       console.log(result1);
//       // console.log(result1.data1.amount)

//       const DBData = {
//         orderId: result1.id,
//         name: req.body.name,
//         invoice: "123" + req.body.name,
//         // amount: bookingData.userobject.wallet,
//         amount: result1.amount,
//         currency: "INR",
//         receipt: result1.receipt,
//         partial_payment: false,
//         user: bookingData.userobject._id,
//         userName: bookingData.userobject.name,
//         hero: bookingData.heroobject[0]._id,
//         heroName: bookingData.heroobject[0].name,

//         //  payment_Id: result1.id,
//         //  amount: result1.amount,
//         //  amount_paid: result1.amount_paid,
//         //  receipt: result1.receipt,
//         //  product: req.body.product,
//         status: req.body.status,
//       };
//       console.log(DBData);
//       const AmountData = await payment.create(DBData);

//       //console.log(AmountData);
//       // const AmountData = await payment.create(data1);
//       bookingData.Status = "success";
//       walletdata.balance = walletdata.balance - bookingData.amount;
//       console.log(walletdata.balance);
//       await walletdata.save();

//       userdata.wallet = walletdata.balance;
//       await userdata.save();
//       //bookingData.amount = bookingData.userobject.wallet;
//       await bookingData.save();
//       return res.status(200).json(AmountData);
//     } else {
//       console.log(b);
//       walletdata.balance = b;
//       console.log(walletdata.balance);

//       // walletdata.balance = parseInt(walletdata.balance) - parseInt(bookingData.amount)

//       const data1 = {
//        amount: walletdata.balance * 100,
//         currency: "INR",
//         receipt: id,
//         partial_payment: false,
//       };
//       console.log(data1);
//       const result1 = await Razorpay.orders.create(data1);
//       console.log(result1);
//       // console.log(result1.data1.amount)

//       const DBData = {
//         orderId: result1.id,
//         name: req.body.name,
//         invoice: "123" + req.body.name,
//         // amount: bookingData.userobject.wallet,
//         amount: result1.amount,
//         currency: "INR",
//         receipt: result1.receipt,
//         partial_payment: false,
//         user: bookingData.userId._id,
//         userName: bookingData.userobject.name,
//         hero: bookingData.heroId._id,
//         heroName: bookingData.heroobject.name,

//         //  payment_Id: result1.id,
//         //  amount: result1.amount,
//         //  amount_paid: result1.amount_paid,
//         //  receipt: result1.receipt,
//         //  product: req.body.product,
//         status: req.body.status,
//       };
//       console.log(DBData);
//       const AmountData = await payment.create(DBData);

//       //console.log(AmountData);
//       // const AmountData = await payment.create(data1);
//       walletdata.balance = 0;
//       await walletdata.save();

//       userdata.wallet = 0;
//       await userdata.save();
//       bookingData.amount = b;
//       bookingData.Status = "success";
//       // await b.save()
//       //bookingData.amount = bookingData.userobject.wallet;
//       await bookingData.save();
//       return res.status(200).json(AmountData);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ message: err.message });
//   }
// };

exports.GetPaymentsByUserId = async (req, res) => {
  try {
    const Data = await payment.find({user:req.params.id});
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
