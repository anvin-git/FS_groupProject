const createUser = require('../models/CreateUser')
const path = require('path')


module.exports = (req,res)=>{
    
    //console.log(req.body.inputAge);
        
    if(!req.body){
     res.status(401).send('Empty Data')
     process.exit(1);
    }

    const Password = req.body.signupPassword;
    const repeatedPassword = req.body.signupRepeatedPassword;

    if(Password == repeatedPassword){

    //store data into model

    // Create a new user with default values
    const newUser = new createUser({
        
        // Default values for other fields
        
        Username: req.body.signupUsername,
        Password: req.body.signupPassword,
        UserType: req.body.userType,
      
    });

    
    console.log("New User Informtion :: "+ newUser);
    //storing into database

    newUser
    .save(newUser)
    .then(data=>{
         res.render('login', { users: [], message: 'Inserted',errors :[] });
    })
    .catch(err=>{

        if (err.name === 'ValidationError') {
            const validationErrors = Object.keys(err.errors).map(key =>
            err.errors[key].message);
            req.session.validationErrors = validationErrors;
            res.render('login', {users : [],message:'', errors: validationErrors });
        }
        res.render('login', { users: [], message: 'NotInserted',errors :[] });
    })

    }
    else{
        res.render('login', { users: [], message: 'dismatchedPasswords',errors :[] });
    }
 
 
 
}