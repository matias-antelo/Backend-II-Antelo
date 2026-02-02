import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import usersRouter from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.router.js';
import Handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import sessionsRouter from "./routes/sessions.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import recoverPasswordRouter from "./routes/recoverPassword.routes.js";
import nodemailer from 'nodemailer';


const app = express();
dotenv.config();

//para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars    
app.engine("handlebars", Handlebars.engine({ helpers: { eq: (a, b) => a === b } }));
app.set('views', path.join(process.cwd(), '/src/views'))
app.set('view engine', 'handlebars');
app.use(express.static("src/public"));
app.use(express.static('src/fotos'));
app.use('/styles', express.static(path.join(process.cwd(), 'src/views/layouts')));

//conexion a la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("Conectado a BBDD") })
    .catch(error => { console.error("Error al conectar a la BBDD", error) });

// middleware para parsear cookies
app.use(cookieParser());

//inicializar passport
initializePassport();
app.use(passport.initialize());

//rutas
app.use("/api/sessions", sessionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', viewsRouter);
app.use('/api/sessions', recoverPasswordRouter);

/*/probando mailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.MAILING_ACCOUNT,
        pass: process.env.MAILING_PASS
    }
});

transporter.sendMail({
    from: process.env.MAILING_ACCOUNT,
    to: "anteloma@Agro.uba.ar",
    subject: 'Prueba de envío de correo',
    html: '<h1>Este es un correo de prueba</h1>'
})/*/


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});