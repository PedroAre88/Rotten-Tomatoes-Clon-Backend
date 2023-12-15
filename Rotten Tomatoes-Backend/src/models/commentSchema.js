const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: Date,
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
});

module.exports = mongoose.model('Comment', CommentSchema);