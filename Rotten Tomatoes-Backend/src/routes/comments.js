const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Ruta para crear un comentario
router.post('/movies/:movieId/comments', commentController.createComment);

// Ruta para darle like a un comentario y en caso de tenerlo quitarselo
router.post('/:id/like', commentController.toggleLike);

// Ruta para obtener los comentarios de esa pelicula
router.get('/movies/:id/comments', commentController.getCommentsByMovie);

// Ruta para actualizar un comentario
router.put('/:id', commentController.updateComment);

// Ruta para eliminar un comentario
router.delete('/:id', commentController.deleteComment);

module.exports = router;