
const getAppointments = require('../models/appointment');

module.exports = (req,res)=>{
    const selectedDate = req.query.date;
    getAppointments.find({date: selectedDate, isTimeSlotAvailable: true })
    .then(availableTimes => {
         
        res.json(availableTimes);
       
      })
      .catch(err=>{

        res
        .status(500)
        .send({message: err.message || "Can not find the appointments   !"})
    }); 

}