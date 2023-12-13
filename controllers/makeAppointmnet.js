const createUser = require('../models/CreateUser');
const Appointment = require('../models/appointment');
const bcrypt = require('bcrypt'); 

module.exports = async (req, res) => {
  const userId = req.session.userId;
  const appointmentID = req.body.time;
  const testtype = req.body.testtype;
  // Hash the licenseNo before updating it

  createUser
    .findByIdAndUpdate(
      userId,
      {
        exam_details:{
          testtype: testtype,
          status: false,
          comments: '',
        },
        appointmentID: appointmentID
        
      },
      { new: true } // Use the { new: true } option to return the updated document
    )
    .then((data) => {
        Appointment.findByIdAndUpdate(appointmentID,
          { isTimeSlotAvailable: false },
          { new: true }
        ).then((updatedAppointment) => {  
          console.log("Data Updated");
          res.render('g2_page', { users: [], message: 'Inserted', errors: [] , req});
        })
        .catch((appointmentErr) => {
          console.error("Error updating appointment:", appointmentErr);
        });
    
    })
    .catch((err) => {
      console.log("Error " + err);
    });
};
