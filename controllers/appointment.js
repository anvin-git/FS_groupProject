
const getAppointments = require('../models/appointment');
const session = require('express-session');


module.exports = (req,res)=>{
    getAppointments.find({})
    .then(allAppointments => {
        // Render the appointment form view with existing appointments data

      

        res.render('appointment', {  message: '' , appointments:allAppointments });
      })
      .catch(err=>{

        res
        .status(500)
        .send({message: err.message || "Can not find the user!"})
    }); 

}