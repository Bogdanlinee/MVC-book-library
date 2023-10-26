"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneBook = exports.createOneBook = exports.getBook = exports.getAllBooks = void 0;
const promises_1 = require("node:fs/promises");
const path_1 = __importDefault(require("path"));
const dbQueries_1 = require("../db/dbQueries");
const bookQueriesUtil_1 = require("../utils/bookQueriesUtil");
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset, search } = req.query;
    const limitValue = limit && typeof limit === 'string' ? parseInt(limit) : 20;
    const offsetValue = offset && typeof offset === 'string' ? parseInt(offset) : 0;
    const searchValue = search && typeof search === 'string' ? search.trim() : null;
    try {
        const booksData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getAllBooksQuery, limitValue, offsetValue, searchValue);
        const booksQuantityData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getBooksQuantity);
        for (const book of booksData) {
            const bookAuthorsData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getBookAuthorsQuery, book.id);
            const authorsString = (0, bookQueriesUtil_1.createStringOfAuthors)(bookAuthorsData);
            book.author = authorsString;
        }
        res.status(200).json({
            data: {
                books: booksData,
                booksOnPageQuantity: booksData.length,
                totalBooks: booksQuantityData[0].count,
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllBooks = getAllBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id && !isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'Provide Book id', });
    }
    const bookId = parseInt(id);
    try {
        const bookData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getOneBookQuery, bookId);
        if (bookData.length === 0) {
            return res.status(400).json({ error: 'No book with such id.', });
        }
        const bookAuthorsData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getBookAuthorsQuery, bookId);
        const authorsString = (0, bookQueriesUtil_1.createStringOfAuthors)(bookAuthorsData);
        bookData[0].author = authorsString;
        res.status(200).json({ data: bookData[0], });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getBook = getBook;
const createOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author_1, author_2, author_3, year, description, } = req.body;
    try {
        const authorList = [author_1, author_2, author_3].reduce((acc, item) => {
            const authorName = (0, bookQueriesUtil_1.capitalizeAuthorName)(item);
            if (authorName.length !== 0) {
                acc.push(authorName);
            }
            return acc;
        }, []);
        if (!title.trim() || !year.trim() || !description.trim() || authorList.length === 0) {
            return res.status(400).json({ error: 'Not enough info to create new book' });
        }
        const authorIdsForNewBook = yield (0, bookQueriesUtil_1.createListOfBookAuthors)(authorList);
        const newBookId = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.addOneBookQuery, title, year, description);
        yield (0, dbQueries_1.addBookAuthorRelationsQuery)(newBookId.insertId, authorIdsForNewBook);
        if (req.file) {
            const fileToCopy = path_1.default.join(__dirname, '..', '../uploads/', req.file.filename);
            const fileDestination = path_1.default.join(__dirname, '..', '../public/images/', newBookId + path_1.default.extname(req.file.filename));
            yield (0, promises_1.copyFile)(fileToCopy, fileDestination);
            yield (0, promises_1.unlink)(fileToCopy);
        }
        res.status(200).redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createOneBook = createOneBook;
const deleteOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id && !isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'Provide Book id', });
    }
    const bookId = parseInt(id);
    try {
        const bookData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getOneBookQuery, bookId);
        if (bookData.length === 0) {
            return res.status(400).json({ error: 'No book with such id.', });
        }
        const bookAuthorsData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getBookAuthorsQuery, bookId);
        yield (0, dbQueries_1.deleteBook)(bookId);
        yield (0, dbQueries_1.deleteBookConnections)(bookId);
        for (const authorData of bookAuthorsData) {
            const authorHasBooksData = yield (0, bookQueriesUtil_1.handleQueryResponse)(dbQueries_1.getAuthorBooks, authorData.id);
            if (authorHasBooksData.length === 0) {
                yield (0, dbQueries_1.deleteAuthor)(authorData.id);
            }
        }
        return res.status(200).json({ data: 'success', });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteOneBook = deleteOneBook;
