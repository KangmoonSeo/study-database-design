import express from 'express';
import logger from 'morgan';
import path from 'path';

import homeRouter from '../routes/home';

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/src')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use('/', homeRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log("http://localhost:3000");
});