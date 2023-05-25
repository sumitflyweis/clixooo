const express = require('express') 
const { sendNotificationstouser,getallusers,updateNotification,deleteNotification} = require('../controllers/admin/notification')
const { getNotificationBycustomerId} = require('../controllers/customer/notification')
const { getNotificationByheroId} = require('../controllers/hero/notification')
const { getNotificationBycustomertoheroId} = require('../controllers/customer-to-hero/notification')
const notificationRouter = express.Router()

notificationRouter.post('/sendNotificationstouser',sendNotificationstouser)
notificationRouter.get('/getallusers',getallusers)
notificationRouter.put('/updateNotification/:role',updateNotification)
 notificationRouter.delete('/deleteNotification/:role',deleteNotification)
notificationRouter.get('/getNotificationByheroId/:id',getNotificationByheroId) 
notificationRouter.get('/getNotificationBycustomerId/:id',getNotificationBycustomerId)
notificationRouter.get('/getNotificationBycustomertoheroId',getNotificationBycustomertoheroId) 
  

module.exports =notificationRouter