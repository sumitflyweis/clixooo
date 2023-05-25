const notification = require('../../models/notification')
const userSchema = require('../../models/User');

exports.getNotificationBycustomertoheroId = async(req,res) => {
    try {
       // const id=req.params.id
        const role=req.body.role
       // const data = await notification.find({ $and: [ {_id:id}, {role:role} ] })
       const data = await notification.find({role:role})
        if(!data){
            return res.status(400).json({
                message: 'Notification not found'
                });
        }
        console.log(data);
        res.status(200).json({
            terms : data
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}

