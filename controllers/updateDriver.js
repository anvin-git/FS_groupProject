const createUser = require('../models/CreateUser');
const Appointment = require('../models/appointment');
const bcrypt = require('bcrypt'); 

module.exports = async (req, res) => {
  const userId = req.session.userId;
  const appointmentID = req.body.time;
  // Hash the licenseNo before updating it
  
  createUser
    .findByIdAndUpdate(
      userId,
      {
        firstname: req.body.inputFirstName,
        lastname: req.body.inputLastName,
        licenseNo: req.body.inputLicense, // Use the hashed licenseNo
        Age: req.body.inputAge,
        car_details: {
          make: req.body.inputMake,
          model: req.body.inputModel,
          year: req.body.inputYear,
          platno: req.body.inputPlateNumber,
        },
        
      },
      { new: true } // Use the { new: true } option to return the updated document
    )
    .then((data) => {
        Appointment.findByIdAndUpdate(appointmentID,
          { isTimeSlotAvailable: false },
          { new: true }
        ).then((updatedAppointment) => {  
          console.log("Data Updated");
          res.render('g2_page', { users: [], message: 'Inserted', errors: [] });
        })
        .catch((appointmentErr) => {
          console.error("Error updating appointment:", appointmentErr);
        });
    
    })
    .catch((err) => {
      console.log("Error " + err);
    });
};
