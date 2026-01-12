import express from 'express';
import path from 'path';
import usersRouter from './routes/users.routes.js';
import viewsRouter from './routes/views.router.js';
import Handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'; 
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import sessionsRouter from "./routes/sessions.routes.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();
const PORT = 3000;

//para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars    
app.engine("handlebars", Handlebars.engine({helpers: {eq: (a, b) => a === b}}));
app.set('views', path.join(process.cwd(), '/src/views'))
app.set('view engine', 'handlebars');
app.use(express.static("src/public"));
app.use(express.static('src/fotos'));
app.use('/styles', express.static(path.join(process.cwd(), 'src/views/layouts')));

//conexion a la base de datos
mongoose.connect("mongodb+srv://anteloma87:Anteloma23%23@carrito-compras-cluster.6u5aaig.mongodb.net/Backend-II")
.then(() => {console.log("Conectado a BBDD")})
.catch(error => {console.error("Error al conectar a la BBDD", error)});

// middleware para parsear cookies
app.use(cookieParser());

//inicializar passport
initializePassport();
app.use(passport.initialize());

//rutas
app.use("/api/sessions", sessionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', viewsRouter);
app.use("/api", cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});