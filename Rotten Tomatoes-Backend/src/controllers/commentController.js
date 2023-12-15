const Comment = require('../models/commentSchema');

exports.createComment = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    const movieId = req.params.movieId;  // Obtener el ID de la película de la URL de la solicitud

    const comment = new Comment({
        content: content,
        author: userId,
        movie: movieId,  // Establecer el campo 'movie' del comentario con el ID de la película
        created_at: new Date()
    });

    try {
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


exports.getCommentsByMovie = async (req, res) => {
    const movieId = req.params.id;

    try {
        const comments = await Comment.find({ movie: movieId })
                                      .lean();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar este comentario' });
        }

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario' });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comentario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


