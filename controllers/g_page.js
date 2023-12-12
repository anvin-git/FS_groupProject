const createUser = require('../models/CreateUser');



module.exports = async(req,res)=>{
  
    const userId = req.session.userId;
    if(userId){
        createUser
        .findOne({ _id:userId })
            .then((users) => {
                if (users.UserType != 'Driver') {
                    res.render('login',{ users: [], message: 'g_reroute',errors :[] });
                   
                } else { 
                    //console.log('successfully retrieved data',users)
                    res.render('g_page', {users : [] , message: '',errors :[]});
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
    else{
        res.render('g_page', {users : [] , message: 'notLoggedin',errors :[]});
    }
    
    
}