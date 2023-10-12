import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './db/dbConnection';
import path from 'path';
import fs from 'fs/promises';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public/book-page'));
app.use(express.static('public/books-page'));


// /api/v1/?offset=N
// /api/v1/books/{book_id}
// /admin/api/v1/.
app.get('*', async (req: Request, res: Response) => {
        res.json({lol: 'lol'})
    }
)

app.listen(port, async () => {
    // migration to create new db
    // const filePath = path.join(__dirname, '../db/createDB.sql');
    // const fileData = await fs.readFile(filePath, {encoding: 'utf-8'});
    // console.log(fileData);

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