const express = require('express');
const  payment = require('../controllers/admin/payment')
const customer= require('../controllers/customer/payment')
const paymentRouter = express();

//customer
paymentRouter.post('/users/CreatePaymentOrder/:id', customer.CreatePaymentOrder),
paymentRouter.get('/payment/:id', customer.GetPaymentsByUserId)


//admin
paymentRouter.get('/GetPaymentsById/:id', payment.GetPaymentsById)
paymentRouter.get('/users/getAllPayments', payment.getAllPayments)
paymentRouter.get('/GetPaymentsByUserId/:user', payment.GetPaymentsByUserIdAdmin)
paymentRouter.put('/changeStatusbyidByAdmin/:id', /*Auth*/ payment.changeStatusbyidByAdmin)


module.exports = paymentRouter;