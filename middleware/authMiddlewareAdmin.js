const User = require('../models/CreateUser')
module.exports = (req, res, next) => {
  

    const userId = req.session.userId;
  
    
    if (userId && req.session.user.UserType === 'Admin') {
        
        return next();
    } 
    else {
        res.render('login',{ users: [], message: 'g_reroute',errors :[] });
    }


};
