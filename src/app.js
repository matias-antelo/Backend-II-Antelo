import express from 'express';
import path from 'path';
import usersRouter from './routes/users.routes.js';
import Handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'; 

const app = express();
const PORT = 3000;

//para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars    
app.engine("handlebars", Handlebars.engine());
app.set('views', path.join(process.cwd(), '/src/views'))
app.set('view engine', 'handlebars');
app.use(express.static('src/fotos'));
app.use('/styles', express.static(path.join(process.cwd(), 'src/views/layouts')));

//conexion a la base de datos
mongoose.connect("mongodb+srv://anteloma87:Anteloma23%23@carrito-compras-cluster.6u5aaig.mongodb.net/Backend-II")
.then(() => {console.log("Conectado a BBDD")})
.catch(error => {console.error("Error al conectar a la BBDD", error)});


// middleware para parsear cookies
app.use(cookieParser());

//setear y ver cockies
app.get("/set-cookie", (req, res, next) => {
    res.cookie("nombre-cookie", "valor", {
        maxAge: 3000, //
    })
        .send("Cookie seteada");
});

app.get("/get-cookie", (req, res, next) => {
    res.json(req.cookies);
});

//rutas
app.use('/api/sessions', usersRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});