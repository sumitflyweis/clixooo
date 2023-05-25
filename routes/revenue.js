const express = require('express') 
const {update_revenue_admin,getrevenue,countOfMaleAndFemale } = require('../controllers/admin/revenue')

const revenue = express.Router()

revenue.put('/update_revenue_admin/:id',update_revenue_admin)//getrevenue
revenue.get('/getrevenue',getrevenue)
revenue.get('/countOfMaleAndFemale',countOfMaleAndFemale)
// revenue.put('/updateNotification/:role',updateNotification)
//  revenue.delete('/deleteNotification/:role',deleteNotification)
// revenue.get('/getNotificationByheroId/:id',getNotificationByheroId) 

  

module.exports =revenue