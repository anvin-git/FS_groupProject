const createUser = require('../models/CreateUser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

module.exports = (req,res)=>{
    const Username = req.body.loginUsername;
    const Password = req.body.loginPassword;

    

    createUser
    .findOne({ Username:Username })
        .then((users) => {
            if (!users) {
                res.render('login', {users : [], message: 'No user Found' ,errors :[], req:req});
            } else { 
                 // Compare the provided password with the stored hashed password
                bcrypt.compare(Password, users.Password, (error, same) => {
                    if (error) {
                        console.error(error);
                        res.render('login', {users : [], message: 'No user Found',errors :[], req:req });
                    }
        
                    if (!same) {
                        res.render('login', {users : [], message: 'Invalid password',errors :[] , req:req});
                        
                    }
                    else{
                        // Successful login
                        req.session.userId = users._id;
                        req.session.user=users;
                        console.log("9999999999999999999999999999999999999999", users)
                        res.redirect('/');
                    }
        
                    
                    });
            }
        })
        .catch(err=>{
           

            if (err.name === 'ValidationError') {
                const validationErrors = Object.keys(err.errors).map(key =>
                err.errors[key].message);
                req.session.validationErrors = validationErrors;
                res.render('login', {users : [],message:'', errors: validationErrors , req:req});
            }

            res
            .status(500)
            .send({message: err.message || "Can not find the user!"})
        });

}