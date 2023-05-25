const notification = require('../../models/notification')

exports.getNotificationBycustomerId = async(req,res) => {
    try {
        const id=req.params.id
        const data = await notification.find({_id:id})
        if(data.length==0){
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