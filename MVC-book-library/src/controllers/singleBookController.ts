import {Request, Response} from 'express';
import {db} from '../db/dbConnection';

const getBook = async (req: Request, res: Response) => {
    const {id: bookId} = req.params;
    console.log(bookId);

    const result = db.query(`SELECT * FROM book_library.books WHERE id=${bookId}`, function (err, result, fields) {
        if (err) {
            throw err
        }
        let bookData = JSON.parse(JSON.stringify(result));

        res.status(200).json({
            data: bookData[0],
        });
    });
}

export default getBook;