import {Request, Response} from 'express';
import {copyFile, unlink} from 'node:fs/promises';
import path from 'path';
import {
    getBookAuthorsQuery,
    getOneBookQuery,
    getAllBooksQuery,
    getOneAuthorQuery,
    addOneAuthorQuery,
    addOneBookQuery,
    addBookAuthorRelationsQuery,
    getBooksQuantity,
    deleteBook,
    deleteBookConnections,
    deleteAuthor,
    getAuthorBooks
} from '../db/dbQueries';
import auth from '../middlewares/authMiddleware';
import mysql from 'mysql';

type AuthorListItem = { [name: string]: string };

const getAllBooks = async (req: Request, res: Response) => {
    const {limit, offset} = req.query;
    const limitValue = limit && typeof limit === 'string' ? parseInt(limit) : 20;
    const offsetValue = offset && typeof offset === 'string' ? parseInt(offset) : 0;

    try {
        // const booksRequest = await getAllBooksQuery(limitValue, offsetValue);
        // const booksData = JSON.parse(JSON.stringify(booksRequest));
        // const booksQuantityRequest = await getBooksQuantity();
        // const booksQuantityData = JSON.parse(JSON.stringify(booksQuantityRequest));

        const booksData = await handleQueryResult(getAllBooksQuery, limitValue, offsetValue);
        const booksQuantityData = await handleQueryResult(getBooksQuantity);

        for (const book of booksData) {
            book.author = await getBookAuthors(book.id);
        }

        res.status(200).json({
            data: {
                books: booksData,
                booksOnPageQuantity: booksData.length,
                totalBooks: booksQuantityData[0].count,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getBook = async (req: Request, res: Response) => {
    const {id} = req.params;
    const bookId = parseInt(id);

    try {
        // const bookRequest = await getOneBookQuery(bookId);
        // const bookData = JSON.parse(JSON.stringify(bookRequest));
        const bookData = await handleQueryResult(getOneBookQuery, bookId);

        if (bookData.length === 0) {
            return res.status(400).json({error: 'No book with such id.',});
        }

        bookData[0].author = await getBookAuthors(bookId);

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
            addAuthorToList(acc, item);
            return acc;
        }, []);

        if (!title.trim() || !year.trim() || !description.trim() || authorList.length === 0) {
            return res.status(400).json({error: 'Not enough info to create new book'});
        }

        const authorIdsForNewBook = await createListOfBookAuthors(authorList);
        // const addedBook = await addOneBookQuery(title, year, description);
        // const newBookId = JSON.parse(JSON.stringify(addedBook)).insertId;

        const newBookId = await handleQueryResult(addOneBookQuery, title, year, description);
        await addBookAuthorRelationsQuery(newBookId.insertId, authorIdsForNewBook);

        if (req.file) {
            const fileToCopy = path.join(__dirname, '..', '../uploads/', req.file.filename);
            const fileDestination = path.join(__dirname, '..', '../public/images/', newBookId + path.extname(req.file.filename));
            await copyFile(fileToCopy, fileDestination);
            await unlink(fileToCopy);
        }

        res.status(200).redirect('/admin');
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
const deleteOneBook = async (req: Request, res: Response) => {
    const {id} = req.params;
    const bookId = parseInt(id);

    try {
        // const bookRequest = await getOneBookQuery(bookId);
        // const bookData = JSON.parse(JSON.stringify(bookRequest));

        const bookData = await handleQueryResult(getOneBookQuery, bookId);

        if (bookData.length === 0) {
            return res.status(400).json({error: 'No book with such id.',});
        }

        // const bookAuthorsRequest = await getBookAuthorsQuery(bookId);
        // const bookAuthorsData = JSON.parse(JSON.stringify(bookAuthorsRequest));

        const bookAuthorsData = await handleQueryResult(getBookAuthorsQuery, bookId);

        // delete data from the book table
        await deleteBook(bookId);

        // delete data from the connections
        await deleteBookConnections(bookId);

        // delete data from the authors if connections does not have book id
        for (const authorData of bookAuthorsData) {
            // const authorHasBooksRequest = await getAuthorBooks(authorData.id);
            // const authorHasBooksData = JSON.parse(JSON.stringify(authorHasBooksRequest));
            const authorHasBooksData = await handleQueryResult(getAuthorBooks, authorData.id);
            if (authorHasBooksData.length === 0) {
                await deleteAuthor(authorData.id);
            }
        }

        return res.status(200).json({data: 'success',});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export {getAllBooks, getBook, createOneBook, deleteOneBook};

const addAuthorToList = (acc: string[], item: string) => {
    const nameSurname = item.split(/\s+/);

    for (let i = 0; i < nameSurname.length; i++) {
        const word = nameSurname[i];
        nameSurname[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    const nameSurnameCapitalized = nameSurname.join(' ').trim();

    if (nameSurnameCapitalized.length !== 0) {
        acc.push(nameSurnameCapitalized)
    }
}

const createListOfBookAuthors = async (authorList: string[]) => {
    const result = [];

    for (const author of authorList) {
        // const isAuthorExistResponse = await getOneAuthorQuery(author);
        // const isAuthorExist = JSON.parse(JSON.stringify(isAuthorExistResponse));
        const isAuthorExist = await handleQueryResult(getOneAuthorQuery, author);

        if (isAuthorExist.length !== 0) {
            result.push(isAuthorExist[0].id);
            continue;
        } else {
            // const addedAuthor = await addOneAuthorQuery(author);
            // const newAuthorId = JSON.parse(JSON.stringify(addedAuthor)).insertId;
            const newAuthorId = await handleQueryResult(addOneAuthorQuery, author);
            result.push(newAuthorId.insertId);
        }
    }

    return result;
}

const getBookAuthors = async (bookId: number) => {
    // const bookAuthorsRequest = await getBookAuthorsQuery(bookId);
    // const bookAuthorsData = JSON.parse(JSON.stringify(bookAuthorsRequest));
    const bookAuthorsData = await handleQueryResult(getBookAuthorsQuery, bookId);
    const authorsList = bookAuthorsData.reduce((acc: string, item: AuthorListItem, index: number) => {
        if (bookAuthorsData.length - 1 === index) {
            acc += item.name;
            return acc;
        }
        acc += item.name + ', ';
        return acc;
    }, '');
    return authorsList;
}

const handleQueryResult = async (callback, ...args: (string | number)[]) => {
    const queryResult = await callback(...args);
    return JSON.parse(JSON.stringify(queryResult));
}