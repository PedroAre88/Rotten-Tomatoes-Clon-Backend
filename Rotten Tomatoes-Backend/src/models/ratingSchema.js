const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model('Rating', ratingSchema);
