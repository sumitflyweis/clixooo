const Notification = require("../../models/notification");
const userSchema= require('../../models/User')
const heroSchema = require('../../models/hero')
const customer_to_hero = require('../../models/customer-to-hero')
const hero = require("../../models/hero");

exports.sendNotificationstouser = async (req, res) => {
  try {
    const message = req.body.message;
    const role = req.body.role;
 
const notifictiontouser=await Notification.create({message:message,role:role})
   return res.status(200).send({msg:notifictiontouser} )
}

   catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};



exports.getallusers = async (req, res) => {
  try {
    const notifications = await Notification.find();
    if (!notifications || notifications.length === 0) {
      return res.status(400).json({
        message: "No notifications",
      });
    }
    return res.status(200).json({
      message: "notifications found",
      data: notifications,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}




exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate({role:req.params.role},{message:req.body.message},{new:true});
    if (!notification) {
      return res.status(400).json({
        message: "Notification not found",
      });
    }
    return res.status(200).json({
      message: "notification updated",
      data: notification,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({role:req.params.role});
    if (!notification) {
      return res.status(400).json({
        message: "Notification not found",
      });
    }
    return res.status(200).json({
      message: "notification deleted",
      data: notification,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
