const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const movieController = require('../controllers/movieController');

router.use(auth);

// Ruta para obtener las películas
router.get('/movies', movieController.getMovies);

// Ruta para obtener una película
router.get('/movies/:id', movieController.getMovie);

// Ruta para obtener las películas recomendadas
router.get('/movies/:id/recommendations', movieController.getRecommendedMovies);

// Ruta para buscar películas
router.get('/movies/search', movieController.searchMovies);

// Ruta para filtrar películas
router.get('/movies/filter', movieController.filterMovies);


module.exports = router;