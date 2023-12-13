const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  licenseNo: { type: String, default: '' },
  Age: { type: Number, default: '' },
  Username: { type: String, required: true, unique: true, message: 'Username is required and must be unique' },
  Password: { type: String, required: true },
  UserType: { type: String, default: 'Driver' },
  car_details: {
    make: { type: String, default: '' },
    model: { type: String, default: '' },
    year: { type: Number, default: '' },
    platno: { type: String, default: '' },
  },
  exam_details:{
    testtype:{ type: String, default: '' },
    status: { type: Boolean, default: false },
    comments: { type: String, default: '' },
  },
  appointmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
});






userSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.Password, 10, (error, hash) => {
    user.Password = hash
    next()
    })
})

const user = mongoose.model("users", userSchema);

module.exports = user;