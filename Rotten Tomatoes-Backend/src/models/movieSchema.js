const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  cast: [String],
  rating: { type: Number, required: true },
});
module.exports = mongoose.model('Movie', movieSchema);