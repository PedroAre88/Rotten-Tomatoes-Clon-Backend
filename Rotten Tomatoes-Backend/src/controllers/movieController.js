const axios = require('axios');
const Movie = require('../models/movieSchema');
const Rating = require('../models/ratingSchema');
const CriticRating = require('../models/criticratingSchema');

exports.getMovie = async (req, res) => {
    const movieId = req.params.id;
 
    // Comprueba si la película ya existe en la base de datos
    const existingMovie = await Movie.findById(movieId);
    if (existingMovie) {
        // Si la película ya existe, devuélvela directamente
        return res.json(existingMovie);
    }
 
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8eba8d44e6c68643cf8ef89092494d71`);
        const movieData = response.data;
 
        // Obtener los detalles del elenco de la película
        const responseCast = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8eba8d44e6c68643cf8ef89092494d71`);
        const castData = responseCast.data.cast;
 
        const movie = new Movie({
            id: movieData.id,
            title: movieData.title,
            genre: movieData.genres.map(genre => genre.name).join(', '),
            description: movieData.overview,
            cast: castData.map(actor => actor.name).join(', '),
        });
 
        const savedMovie = await movie.save();
 
        // Calculate average user rating
        const userRatings = await Rating.aggregate([
            { $match: { movie: mongoose.Types.ObjectId(movieId) } },
            { $group: { _id: null, averageUserRating: { $avg: "$score" } } }
        ]);
 
        const averageUserRating = userRatings.length > 0 ? userRatings[0].averageUserRating : null;
 
        // Calculate average critic rating
        const criticRatings = await CriticRating.aggregate([
            { $match: { movie: mongoose.Types.ObjectId(movieId) } },
            { $group: { _id: null, averageCriticRating: { $avg: "$score" } } }
        ]);
 
        const averageCriticRating = criticRatings.length > 0 ? criticRatings[0].averageCriticRating : null;
 
        res.json({
            movie: savedMovie,
            averageUserRating: averageUserRating,
            averageCriticRating: averageCriticRating
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 }

   
exports.getRecommendedMovies = async (req, res) => {
       const movieId = req.params.id;
   
       try {
           const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=8eba8d44e6c68643cf8ef89092494d71`);
           const recommendedMoviesData = response.data.results;
   
           let recommendedMovies = [];
           for (let movieData of recommendedMoviesData) {
               const movie = new Movie({
                   id: movieData.id,
                   title: movieData.title,
                   genre: movieData.genre_ids.join(', '), // Esta línea asume que los géneros se devuelven como una lista de ID
                   description: movieData.overview,
               });
   
               const savedMovie = await movie.save();
               recommendedMovies.push(savedMovie);
           }
   
           res.json(recommendedMovies);
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   }

   exports.searchMovies = async (req, res) => {
    const keyword = req.query.keyword;
  
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8eba8d44e6c68643cf8ef89092494d71&query=${keyword}`);
        const moviesData = response.data.results;
  
        let movies = [];
        for (let movieData of moviesData) {
            const movie = new Movie({
                id: movieData.id,
                title: movieData.title,
                genre: movieData.genre_ids.join(', '),
                description: movieData.overview,
            });
  
            const savedMovie = await movie.save();
            movies.push(savedMovie);
        }
  
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  }
   