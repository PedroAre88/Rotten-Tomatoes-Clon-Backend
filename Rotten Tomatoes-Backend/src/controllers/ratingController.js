const Rating = require('../models/ratingSchema');

exports.createRating = async (req, res) => {
    const { score } = req.body;
    const userId = req.user.id;
    const movieId = req.params.movieId;

    const rating = new Rating({
        score: score,
        user: userId,
        movie: movieId,
    });

    try {
        const savedRating = await rating.save();
        res.status(201).json(savedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getRatingsByMovie = async (req, res) => {
    const movieId = req.params.id;

    try {
        const ratings = await Rating.find({ movie: movieId })
                                    .populate('user')
                                    .lean();
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
