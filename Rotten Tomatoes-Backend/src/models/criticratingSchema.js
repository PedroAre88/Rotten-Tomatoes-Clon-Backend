const mongoose = require('mongoose');

const criticRatingSchema = new mongoose.Schema({
 movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
 critic: { type: mongoose.Schema.Types.ObjectId, ref: 'Critic' },
 score: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model('CriticRating', criticRatingSchema);
