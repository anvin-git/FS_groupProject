const User = require('../models/CreateUser')
module.exports = (req, res, next) => {
  

    const userId = req.session.userId;
  
    console.log(userId && req.session.UserType === 'Driver');
    console.log(userId,req.session.user);

    
    if (userId && req.session.user.UserType === 'Driver') {
        console.log(userId,req.session.user.UserType );
        return next();
    }
    else {
        res.render('login',{ users: [], message: 'g_reroute',errors :[] });
    }

   


};
