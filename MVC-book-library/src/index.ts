import express, {Request, response, Response} from 'express';
import basicAuth from 'express-basic-auth';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {connectDB, db} from './db/dbConnection';
import booksRoutes from './routes/booksRoutes';
import getBook from './routes/singleBookRoutes';

dotenv.config();

const app = express();
const port = 5000;

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve static
app.use('/', express.static('public/books-page'));
app.use('/book/:id', express.static('public/book-page'));
app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/book', getBook);

// app.get('/protected', (req, res) => {
//     res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
//     res.status(401).send('Authentication required.');
// });

app.post('/api/v1/admin', async (req, res) => {
    const {email, password} = req.body;

    try {
        db.query(`SELECT * FROM book_library.admin WHERE email='${email}'`, function (err, result, fields) {
            if (err) {
                throw err;
            }

            const adminUser = JSON.parse(JSON.stringify(result))[0];


            if (!adminUser || adminUser.password !== password.trim()) {
                return res.status(400).json({error: 'Wrong credentials'});
            }

            const authHeader = 'Basic ' + Buffer.from(email + ':' + password).toString('base64');
            res.setHeader('WWW-Authenticate', authHeader);

            res.status(200).json({user: adminUser});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


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