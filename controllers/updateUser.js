const createUser = require('../models/CreateUser');
const path = require('path');

module.exports = (req,res)=>{
    const userId = req.body.inputID;
   


    createUser
    .findByIdAndUpdate(userId,
        {
            car_details: {
                make:req.body.inputMake,
                model:req.body.inputModel,
                year:req.body.inputYear,
                platno:req.body.inputPlateNumber
            }
        
        })
        .then(data => {
           console.log("Data Updated");
           res.render('g_page', {users : [], message: 'Updated',errors :[] });
        })
        .catch(err=>{
           console.log("Error "+err );
        });
    }