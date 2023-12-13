const createUser = require('../models/CreateUser');
const Appointment = require('../models/appointment');
const bcrypt = require('bcrypt'); 

module.exports = async (req, res) => {
  const userId = req.body.user_id;

  const testtype = req.body.testtype;
  const status = req.body.status;
  const comments = req.body.comments; 
  console.log(res);
  // Hash the licenseNo before updating it
  
  createUser
    .findByIdAndUpdate(
      userId,
      {
        exam_details:{
            testtype: testtype,
            status: status,
            comments: comments,
          },
        
      },
      { new: true } // Use the { new: true } option to return the updated document
    )
    .then((data) => {
      res.render('examiner_list', { users: [], message: 'Inserted', errors: [], req: req });
    })
    .catch((appointmentErr) => {
      console.error("Error updating appointment:", appointmentErr);
    });
    
   
};
