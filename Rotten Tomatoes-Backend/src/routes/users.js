const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { login, register, profile, logout, searchUsers } = require('../controllers/userController');

router.use(auth);

// Ruta para hacer login y verificar el usuario
router.post('/login', login);

// Ruta de cierre de sesión
router.post('/logout', logout);

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para acceder al perfil y autenticar su sesion
router.get('/profile', profile);

// Ruta para la busqueda y filtracion de usuarios
router.get('/search', searchUsers);

module.exports = router;