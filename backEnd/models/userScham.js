import mongoose from "mongoose";
// const validator = require('validator');
import validator from 'validator';
import bcrypt from 'bcrypt';
import './order.js'


const useSch = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter Your Name...'],
    maxLength: [20, 'Name should be less then 20 charctors'],
    minLength: [2, 'Name should be less then 20 charctors'],
    trim: 0,
  },
  email: {
    type: String,
    required: true,
    unique: [true, `you'r register before`],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Enter valid Email']
  },
  photo: {
    type: String,
    default: "/img/users/default.png"
  },
  orderID: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Order'
    }
  ],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  mobile: String,
  address: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    minLength: 8,
    required: [true, 'Please provide a password confirm'],
    validate: {
      validator: function(el){
        return this.password === el; // check password and passconfirm 
      },
      message: 'Passwords are not the same !!!'
    }
  },
  passwordRestToken: String,
  passwordResetExpires: Date
})

// pre save will run before saveing to database
useSch.pre('save', async function (next) {
  try {
    // check if password تغير من قبل 
    // only new user will Enter and will do encrption
    if (!this.isModified('password')) return next();
    this.passwordConfirm = undefined;
    this.password = await bcrypt.hash(this.password, 10);
    next();

  } catch(err) {
    res.status(500).json({message: err.message, allMessage: err});
  }
})

useSch.pre('save', function(next) {
  if (!this.isModified('') || this.isNew) return next();
  
})

useSch.pre('/^find/', function(next) {
  this.populate({
    path: '',
    select: '-__v -passwordChangedAt',
  })
  next();
})


const User = mongoose.model('User', useSch)
export default User;