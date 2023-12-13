
const getAppointments = require('../models/appointment');
const userModel = require('../models/CreateUser');

module.exports = async(req,res)=>{
    const selectedDate = req.query.date;
    console.log("***Date***", selectedDate)
    const userModelValues = await userModel.find({}).populate({path: 'appointmentID', match: {testype: "G2"}}).exec();
    console.log("********USERS***********", userModelValues)
    getAppointments.find({date: selectedDate, isTimeSlotAvailable: true })
    .then(availableTimes => {
        console.log("Available times ====>", availableTimes)
        res.json(availableTimes);
    })
      .catch(err=>{

              res
              .status(500)
              .send({message: err.message || "Can not find the appointments   !"})
    }); 

}