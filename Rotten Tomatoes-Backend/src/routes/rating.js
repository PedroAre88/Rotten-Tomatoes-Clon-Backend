const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ratingController = require('../controllers/ratingController');

router.use(auth);

// Ruta para crear una calificación
router.post('/movies/:movieId/ratings', ratingController.createRating);

// Ruta para obtener las calificaciones de una película
router.get('/movies/:id/ratings', ratingController.getRatingsByMovie);

module.exports = router;