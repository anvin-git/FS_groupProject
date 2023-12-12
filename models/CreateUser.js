const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
  firstname: { type: String, default: 'default' },
  lastname: { type: String, default: 'default' },
  licenseNo: { type: String, default: 'default' },
  Age: { type: Number, default: 0 },
  Username: { type: String, required: true, unique: true, message: 'Username is required and must be unique' },
  Password: { type: String, required: true },
  UserType: { type: String, default: 'Driver' },
  car_details: {
    make: { type: String, default: 'default' },
    model: { type: String, default: 'default' },
    year: { type: Number, default: 0 },
    platno: { type: String, default: 'default' },
  },
  exam_details:{
    testtype:{ type: String, default: 'G2' },
    status: { type: Boolean, default: false },
    comments: { type: String, default: '' },
  }
  ,
  appointmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
});




userSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.licenseNo, 10, (error, hash) => {
    user.licenseNo = hash
    next()
    })
})

userSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.Password, 10, (error, hash) => {
    user.Password = hash
    next()
    })
})

const user = mongoose.model("users", userSchema);

module.exports = user;