// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],  // Email format validation
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['user', 'recycler', 'ngo'],
    required: true,
  },
  address: String,
  contact: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
