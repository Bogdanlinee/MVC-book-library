import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {connectDB} from './db/dbConnection';
import morgan from 'morgan';
import booksRoutes from './routes/booksRoutes';
import getBook from './routes/singleBookRoutes';

dotenv.config();

const app = express();
const port = 3000;

app.use(morgan('tiny'))

// serve static
app.use('/', express.static('public/books-page'));
app.use('/book/:id', express.static('public/book-page'));

// serve static
app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/book', getBook);

app.listen(port, async () => {
    if (!process.env.MYSQL_CONNECTION) {
        throw new Error('No db credentials');
    }
    connectDB(process.env.MYSQL_CONNECTION);
    try {
    } catch (err) {
        console.log(err);
    }
    console.log('server is running');
})