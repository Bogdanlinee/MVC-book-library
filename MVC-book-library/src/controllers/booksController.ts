import {Request, Response} from 'express';
import {
    getBookAuthorsQuery,
    getOneBookQuery,
    getAllBooksQuery,
    getOneAuthorQuery,
    addOneAuthorQuery
} from '../db/dbQueries';

type AuthorListItem = { [name: string]: string };

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const booksRequest = await getAllBooksQuery();
        const booksData = JSON.parse(JSON.stringify(booksRequest));
        res.status(200).json({data: {books: booksData,}});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getBook = async (req: Request, res: Response) => {
    const {id: bookId} = req.params;

    try {
        const bookRequest = await getOneBookQuery(bookId);
        const bookData = JSON.parse(JSON.stringify(bookRequest));
        const bookAuthorsRequest = await getBookAuthorsQuery(bookId);
        const bookAuthorsData = JSON.parse(JSON.stringify(bookAuthorsRequest));
        const authorsList = bookAuthorsData.reduce((acc: string, item: AuthorListItem, index: number) => {
            if (bookAuthorsData.length - 1 === index) {
                acc += item.name;
                return acc;
            }
            acc += item.name + ', ';
            return acc;
        }, '');

        if (bookData.length === 0) {
            return res.status(400).json({error: 'No book with such id.',});
        }

        bookData[0].author = authorsList;

        res.status(200).json({data: bookData[0],});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const createOneBook = async (req: Request, res: Response) => {
    const {title, author_1, author_2, author_3, year, description,} = req.body;

    try {
        const authorList: string[] = [author_1, author_2, author_3].reduce((acc, item) => {
            const nameSurname = item.split(/\s+/);

            for (let i = 0; i < nameSurname.length; i++) {
                const word = nameSurname[i];
                nameSurname[i] = word.charAt(0).toUpperCase() + word.slice(1);
            }

            const nameSurnameCapitalized = nameSurname.join(' ').trim();

            if (nameSurnameCapitalized.length !== 0) {
                acc.push(nameSurnameCapitalized)
            }

            return acc;
        }, []);

        for (const author of authorList) {
            const isAuthorExistResponse = await getOneAuthorQuery(author);
            const isAuthorExist = JSON.parse(JSON.stringify(isAuthorExistResponse));
            if (isAuthorExist.length !== 0) {
                continue;
            } else {
                console.log(await addOneAuthorQuery(author));
            }
        }

        if (!title.trim() || !year.trim() || !description.trim() || authorList.length === 0) {
            return res.status(400).json({error: 'Not enough info to create new book'});
        }


        res.status(200).json({success: true});
        // res.status(200).redirect('/admin');
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export {getAllBooks, getBook, createOneBook};