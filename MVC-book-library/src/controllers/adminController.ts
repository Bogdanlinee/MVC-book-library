import {Request, Response} from 'express';
import {db} from '../db/dbConnection';

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const result = db.query("SELECT * FROM book_library.books", function (err, result, fields) {
            if (err) {
                throw err;
            }
            let booksData = JSON.parse(JSON.stringify(result));
            res.status(200).json({data: {books: booksData,}});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const deleteOneBook = async (req: Request, res: Response) => {

}

const createOneBook = async (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).redirect('/admin/');
}

export {getAllBooks, createOneBook, deleteOneBook}