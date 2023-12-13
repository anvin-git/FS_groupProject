const userModel = require('../models/CreateUser');
const appointmentModel = require('../models/appointment');

module.exports = async(req,res)=>{
  
    const userId = req.session.userId;
    if(userId){
        userModel
        .findOne({ _id:userId })
            .then((users) => {
                if (users.UserType != 'Driver') {
                    res.render('login',{ users: [], message: 'g_reroute',errors :[], req: req });
                } else {    
                    console.log('successfully retrieved data',users)
                    // appointmentModel.
                    const newAppointment = new appointmentModel({
    
                        date:'2023-12-12',
                        time:"03:00 pm" ,
                        testtype:'G2',
                
                    });
                
                    appointmentModel.find({testtype: "G"})
                            .then(allAppointments => {
                                console.log("*******All Appointments ********", allAppointments)
                                res.render('g_page', {users, message: '',errors :[], req: req, appointmentSlots})
                        })
                        .catch(err=>{
                            res.render('g_page', {users, message: '',errors :[], req: req});
                        });
                    //storing into database
                
                    // newAppointment
                    // .save(newAppointment)
                    // .then(data=>{
                    //     appointmentModel.find({})
                    //         .then(allAppointments => {
                    //         console.log("*******All Appointments ********", allAppointments)
                    //     })
                    //     .catch(err=>{
                    //         res.render('g_page', {users, message: '',errors :[], req: req});
                    //     });
                    // })
                    // .catch(err=>{
                    //     if (err.name === 'ValidationError') {
                    //         const validationErrors = Object.keys(err.errors).map(key =>
                    //         err.errors[key].message);
                    //         req.session.validationErrors = validationErrors;
                    //         res.render('g_page', {users : [],message:'', errors: validationErrors, req:req });
                    //     }
                    //     res
                    //     .status(500)
                    //     .send({message: err.message || "Can not find the user!"})
                    // });   
                }
            })
    }
}