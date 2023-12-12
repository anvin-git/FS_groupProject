const createUser = require('../models/CreateUser');
const bcrypt = require('bcrypt');

module.exports = (req,res)=>{
    
    const userId = req.session.userId;
    if(userId){
        createUser
        .findOne({ _id:userId })
            .then((users) => {
                if (users.UserType != 'Driver') {
                    res.render('login',{ users: [], message: 'g_reroute' , req: req});
                } else { 
                    //console.log(users.UserType,users)

                    bcrypt.compare('default', users.licenseNo, (error, same) => {
                        if (error) {
                            console.error(error);
                            res.render('login', {users : [], message: 'No user Found', req:req });
                        }
            
                        if (same) {
                            res.render('g2_page', {users : [], message: '' ,errors :[], req:req});
                            
                        }
                        else{
                            // Successful login
                            res.render('g2_page', {users : users ,message: '' ,errors :[], req:req});


                           
                        }
            
                        
                        });



                   
                }
            })
            .catch(err=>{

                if (err.name === 'ValidationError') {
                    const validationErrors = Object.keys(err.errors).map(key =>
                    err.errors[key].message);
                    req.session.validationErrors = validationErrors;
                    res.render('g2_page', {users : [],message:'', errors: validationErrors, req:req });
                }

                res
                .status(500)
                .send({message: err.message || "Oops! Developer at Work. Errors will be removed in next assignemnt !!"})
            });   
    }
    else{
        res.render('g2_page', {users : [] , message: 'notLoggedin',errors :[], req:req});
    }
    
    
}