const express = require('express');
const ejs=require('ejs'); 
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const authMiddlewareAdmin = require('./middleware/authMiddlewareAdmin');
//Requiring Model CreateUser
const createUser = require('./models/CreateUser')

// adding mongooes connection
const mongooes = require('mongoose')


// use your connection string
const conString ='mongodb+srv://anvin3105:bAeA0YsH7lZDC9kN@cluster0.zpkohkb.mongodb.net/'
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
const login = require('./controllers/login')
const createUsers = require('./controllers/createUsers');
const getUser = require('./controllers/getUser');
const updateUser = require('./controllers/updateUser');
const loginUser = require('./controllers/loginUser');
const updateDriver = require('./controllers/updateDriver');
const appointment = require('./controllers/appointment');
const createAppointment = require('./controllers/createAppointment');
const timeSlotFinder = require('./controllers/timeSlotFinder');
const timeSlotFinderAdmin = require('./controllers/timeSlotFinderAdmin')

app.get('/',dashboard); 
app.get('/g_test',authMiddleware,g_page);
app.get('/g2_test',authMiddleware,g2_page);
app.get('/login',login);



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



app.get('/timeslots', timeSlotFinder);


app.get('/timeslotsAdmin', timeSlotFinderAdmin);

const port = 4000;
app.listen(port,(req,res)=>{
    console.log(`Application is running on port ${port}`);
    console.log("Welcome to Express");
});