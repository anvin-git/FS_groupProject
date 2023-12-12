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
                res.render('login', {users : [], message: 'No user Found' ,errors :[]});
            } else { 
                 // Compare the provided password with the stored hashed password
                bcrypt.compare(Password, users.Password, (error, same) => {
                    if (error) {
                        console.error(error);
                        res.render('login', {users : [], message: 'No user Found',errors :[] });
                    }
        
                    if (!same) {
                        res.render('login', {users : [], message: 'Invalid password',errors :[] });
                        
                    }
                    else{
                        // Successful login
                        req.session.userId = users._id;
                        req.session.user=users;
                        res.render('login', {users, message: 'Success' ,errors :[]});
                    }
        
                    
                    });
            }
        })
        .catch(err=>{
           

            if (err.name === 'ValidationError') {
                const validationErrors = Object.keys(err.errors).map(key =>
                err.errors[key].message);
                req.session.validationErrors = validationErrors;
                res.render('login', {users : [],message:'', errors: validationErrors });
            }

            res
            .status(500)
            .send({message: err.message || "Can not find the user!"})
        });

}