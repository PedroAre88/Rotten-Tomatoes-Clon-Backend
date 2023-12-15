const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bio: String,
    created_at: Date,
  });


module.exports = mongoose.model('User', UserSchema);