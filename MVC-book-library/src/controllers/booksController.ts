import {Request, Response} from 'express';
import {copyFile, unlink} from 'node:fs/promises';
import path from 'path';
import {
    getBookAuthorsQuery,
    getOneBookQuery,
    getAllBooksQuery,
    addOneBookQuery,
    addBookAuthorRelationsQuery,
    getBooksQuantity,
    deleteBook,
    deleteBookConnections,
    deleteAuthor,
    getAuthorBooks
} from '../db/dbQueries';
import {
    handleQueryResponse,
    createStringOfAuthors,
    capitalizeAuthorName,
    createListOfBookAuthors
} from '../utils/bookQueriesUtil';

const getAllBooks = async (req: Request, res: Response) => {
    const {limit, offset, search} = req.query;
    const limitValue = limit && typeof limit === 'string' ? parseInt(limit) : 20;
    const offsetValue = offset && typeof offset === 'string' ? parseInt(offset) : 0;
    const searchValue = search && typeof search === 'string' ? search.trim() : null;

    try {
        const booksData = await handleQueryResponse(getAllBooksQuery, limitValue, offsetValue, searchValue);
        const booksQuantityData = await handleQueryResponse(getBooksQuantity);

        for (const book of booksData) {
            const bookAuthorsData = await handleQueryResponse(getBookAuthorsQuery, book.id);
            const authorsString = createStringOfAuthors(bookAuthorsData);
            book.author = authorsString;
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

    if (!id && !isNaN(parseInt(id))) {
        return res.status(400).json({error: 'Provide Book id',});
    }

    const bookId = parseInt(id);

    try {
        const bookData = await handleQueryResponse(getOneBookQuery, bookId);

        if (bookData.length === 0) {
            return res.status(400).json({error: 'No book with such id.',});
        }

        const bookAuthorsData = await handleQueryResponse(getBookAuthorsQuery, bookId);
        const authorsString = createStringOfAuthors(bookAuthorsData);

        bookData[0].author = authorsString;

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
            const authorName = capitalizeAuthorName(item);

            if (authorName.length !== 0) {
                acc.push(authorName);
            }

            return acc;
        }, []);

        if (!title.trim() || !year.trim() || !description.trim() || authorList.length === 0) {
            return res.status(400).json({error: 'Not enough info to create new book'});
        }

        const authorIdsForNewBook = await createListOfBookAuthors(authorList);
        const newBookId = await handleQueryResponse(addOneBookQuery, title, year, description);

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

    if (!id && !isNaN(parseInt(id))) {
        return res.status(400).json({error: 'Provide Book id',});
    }

    const bookId = parseInt(id);

    try {
        const bookData = await handleQueryResponse(getOneBookQuery, bookId);

        if (bookData.length === 0) {
            return res.status(400).json({error: 'No book with such id.',});
        }

        const bookAuthorsData = await handleQueryResponse(getBookAuthorsQuery, bookId);
        await deleteBook(bookId);
        await deleteBookConnections(bookId);

        for (const authorData of bookAuthorsData) {
            const authorHasBooksData = await handleQueryResponse(getAuthorBooks, authorData.id);
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