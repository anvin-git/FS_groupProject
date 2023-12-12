const createUser = require('../models/CreateUser');
const path = require('path');
const bcrypt = require('bcrypt'); 

module.exports = async(req,res)=>{
    
    // console.log(licenseNumber);

   

    createUser
    .findOne({ licenseNo:req.body.inputLicense })
        .then((users) => {
            if (!users) {
                res.render('g_page', {users : [], message: 'No user Found',errors :[] });
            } else { 
                //console.log('successfully retrieved data',users)
                res.render('g_page', { users , message: '',errors :[]});
            }
        })
        .catch(err=>{
            if (err.name === 'ValidationError') {
                const validationErrors = Object.keys(err.errors).map(key =>
                err.errors[key].message);
                req.session.validationErrors = validationErrors;
                res.render('g_page', {users : [],message:'', errors: validationErrors });
            }
            res
            .status(500)
            .send({message: err.message || "Can not find the user!"})
        });
    }