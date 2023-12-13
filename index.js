const connectFile = require('./connection');
const express = require('express');
const ejs=require('ejs'); 
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const authMiddlewareAdmin = require('./middleware/authMiddlewareAdmin');
const authMiddlewareExaminer =require('./middleware/authMiddlewareExaminer');
//Requiring Model CreateUser
const createUser = require('./models/CreateUser')

// adding mongooes connection
const mongooes = require('mongoose')

// use your connection string
const conString = connectFile;
try{
const connection = mongooes.connect(conString)
console.log('MongoDb Connected!!! Keep it up!!')
}
catch(err){
console.log('MongoDb Not Connected!!! Try agian!!')
}



const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'assignment_fullstack'
    }))
    

app.set('view engine','ejs');

const dashboard = require('./controllers/dashboard');
const g_page = require('./controllers/g_page');
const g2_page = require('./controllers/g2_page');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const createUsers = require('./controllers/createUsers');
const getUser = require('./controllers/getUser');
const updateUser = require('./controllers/updateUser');
const loginUser = require('./controllers/loginUser');
const updateDriver = require('./controllers/updateDriver');
const appointment = require('./controllers/appointment');
const createAppointment = require('./controllers/createAppointment');
const timeSlotFinder = require('./controllers/timeSlotFinder');
const timeSlotFinderAdmin = require('./controllers/timeSlotFinderAdmin');
const makeAppointment = require('./controllers/makeAppointmnet');
const driversList = require('./controllers/driversList');
const getDrivers = require('./controllers/getDrivers');
const examinerlist = require('./controllers/examinerList');
const updateTestStatus =require('./controllers/updateTestStatus');

app.get('/',dashboard); 
app.get('/g_test',authMiddleware,g_page);
app.get('/g2_test',authMiddleware,g2_page);
app.get('/login',login);
app.get('/logout', logout);



// adding details from G2 page form to DB
app.post('/CreateUser',createUsers);

//retrieving data from DB to show in G page
app.post('/getUser', getUser);


// Upadating details from G page to DB
app.post('/updateUser', updateUser);


// signup User
app.post('/signupUser', createUsers);
    
// login User
app.post('/loginUser', loginUser);

//update driver detials came from G2 page
app.post('/updateDriver', updateDriver);

//appointment page for Admin
app.get('/appointment',authMiddlewareAdmin, appointment);


//create appointment.
app.post('/createAppointment', createAppointment);

//make an appointment.
app.post('/makeAppointment', makeAppointment);

// to find available time slots
app.get('/timeslots', timeSlotFinder);
app.get('/timeslotsAdmin', timeSlotFinderAdmin);

//to load diverslist for admin
app.get('/driverlist',authMiddlewareAdmin,driversList);

//to get drivers list 
app.get('/getDrivers',getDrivers);

// to load driver listing for examiner
app.get('/examinerlist',authMiddlewareExaminer,examinerlist);

//to update test staus and comments
app.post('/updateTestStatus',updateTestStatus);




const port = 4000;
app.listen(port,(req,res)=>{
    console.log(`Application is running on port ${port}`);
    console.log("Welcome to Express");
});