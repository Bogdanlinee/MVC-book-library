import express, {Request, response, Response} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {connectDB} from './db/dbConnection';
import booksRouter from './routes/booksRoutes';
import adminRouter from './routes/adminRoutes';
import conversionRouter from './routes/conversionRoutes';
import auth from './middlewares/authMiddleware';
import {cornStart} from './utils/cron';
import runMigrations from './utils/runMigrations';


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
    try {
        if (!process.env.MYSQL_CONNECTION) {
            throw new Error('No db credentials');
        }
        connectDB(process.env.MYSQL_CONNECTION);
        runMigrations();
        cornStart(process.env.MYSQL_CONNECTION);
        console.log('server is running');
    } catch (err) {
        console.log(err);
    }
});

