// // models/User.js
// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     match: [/.+\@.+\..+/, 'Please fill a valid email address'],
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6, // Minimum length for password
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false, // Set to true for admin users
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Create a User model using the schema
// const User = mongoose.models.User || mongoose.model('User', UserSchema);

// export default User;


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
  isAdmin: {
    type: Boolean,
    default: false, // Set to true for admin users
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a User model using the schema
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
