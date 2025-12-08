import express from 'express';
import path from 'path';
import usersRouter from './routes/users.routes.js';
import Handlebars from 'express-handlebars';


const app = express();
const PORT = 3000;

//handlebars    
app.engine("handlebars", Handlebars.engine());
app.set('views', path.join(process.cwd(), '/src/views'))
app.set('view engine', 'handlebars');
app.use(express.static('src/fotos')); 
app.use('/styles', express.static(path.join(process.cwd(), 'src/views/layouts')));


//rutas
app.use('/api/users', usersRouter);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});