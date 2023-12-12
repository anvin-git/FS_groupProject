const createAppointment = require('../models/appointment');
const session = require('express-session');

module.exports = (req,res)=>{
    if(!req.body){
        res.status(401).send('Empty Data')
        process.exit(1);
    }


    // inserting appointment details to DB
    const newAppointment = new createAppointment({
        
        date:req.body.date,
        time:req.body.time ,
    });

    
    //storing into database

    newAppointment
    .save(newAppointment)
    .then(data=>{
        createAppointment.find({})
            .then(allAppointments => {
            res.render('appointment',{ message: 'Inserted' , appointments: allAppointments, req: req}); 
        })
        .catch(err=>{
  
          res
          .status(500)
          .send({message: err.message || "Can not find the user!"})
      });
    })
    .catch(err=>{

        res.render('appointment', { message: 'NotInserted' , appointments: [], req:req});
    })
}