import express, {Request, response, Response} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {connectDB} from './db/dbConnection';
import booksRouter from './routes/booksRoutes';
import adminRouter from './routes/adminRoutes';
import conversionRouter from './routes/conversionRoutes';
import auth from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const port = 3000;

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve static
app.use('/', express.static('public/books-page'));
app.use('/book/:id', express.static('public/book-page'));
app.use('/admin', auth, express.static('public/admin-page'));
app.use('/images', express.static('public/images'));

app.use('/api/v1/books', booksRouter);
app.use('/admin/api/v1', adminRouter);
app.use('/api/v1/conversion', conversionRouter);

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