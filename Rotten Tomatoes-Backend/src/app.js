const express = require('express');
const connectDB = require('./services/db');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');
const ratingRouter = require('./routes/rating');
const movieRouter = require('./routes/movie')
const passport = require('./services/userVerify');


const app = express();

app.use(passport.initialize());

// Conectar a la base de datos
connectDB();

// Configurar Express para usar JSON
app.use(express.json());

// Configurar las rutas
app.use('/movies', movieRouter);
app.use('/ratings', ratingRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter); 

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
