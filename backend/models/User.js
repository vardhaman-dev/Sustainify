const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
