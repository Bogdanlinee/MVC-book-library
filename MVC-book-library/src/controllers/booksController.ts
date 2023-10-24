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
    getBooksQuantity
} from '../db/dbQueries';

type AuthorListItem = { [name: string]: string };

const getAllBooks = async (req: Request, res: Response) => {
    const {limit, offset} = req.query;

    let limitValue;
    let offsetValue;

    if (limit && typeof limit === 'string') {
        limitValue = parseInt(limit);
    } else {
        limitValue = 20;
    }

    if (offset && typeof offset === 'string') {
        offsetValue = parseInt(offset);
    } else {
        offsetValue = 0;
    }


    try {
        const booksRequest = await getAllBooksQuery(limitValue, offsetValue);
        const booksData = JSON.parse(JSON.stringify(booksRequest));
        const booksQuantityRequest = await getBooksQuantity();
        const booksQuantityData = JSON.parse(JSON.stringify(booksQuantityRequest));

        for (const book of booksData) {
            book.author = await findBookAuthors(book.id);
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
        const bookRequest = await getOneBookQuery(bookId);
        const bookData = JSON.parse(JSON.stringify(bookRequest));

        if (bookData.length === 0) {
            return res.status(400).json({error: 'No book with such id.',});
        }

        bookData[0].author = await findBookAuthors(bookId);

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
        const addedBook = await addOneBookQuery(title, year, description);
        const newBookId = JSON.parse(JSON.stringify(addedBook)).insertId;

        await addBookAuthorRelationsQuery(newBookId, authorIdsForNewBook);

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
        const isAuthorExistResponse = await getOneAuthorQuery(author);
        const isAuthorExist = JSON.parse(JSON.stringify(isAuthorExistResponse));

        if (isAuthorExist.length !== 0) {
            result.push(isAuthorExist[0].id);
            continue;
        } else {
            const addedAuthor = await addOneAuthorQuery(author);
            const newAuthorId = JSON.parse(JSON.stringify(addedAuthor)).insertId;
            result.push(newAuthorId);
        }
    }

    return result;
}

const findBookAuthors = async (bookId: number) => {
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
    return authorsList;
}

export {getAllBooks, getBook, createOneBook};