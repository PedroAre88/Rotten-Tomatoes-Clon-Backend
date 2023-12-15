const mongoose = require('mongoose');

const criticSchema = new mongoose.Schema({
 id: String,
 name: String,
});

module.exports = mongoose.model('Critic', criticSchema);
