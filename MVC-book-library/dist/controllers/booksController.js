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
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset } = req.query;
    const limitValue = limit && typeof limit === 'string' ? parseInt(limit) : 20;
    const offsetValue = offset && typeof offset === 'string' ? parseInt(offset) : 0;
    try {
        const booksRequest = yield (0, dbQueries_1.getAllBooksQuery)(limitValue, offsetValue);
        const booksData = JSON.parse(JSON.stringify(booksRequest));
        const booksQuantityRequest = yield (0, dbQueries_1.getBooksQuantity)();
        const booksQuantityData = JSON.parse(JSON.stringify(booksQuantityRequest));
        for (const book of booksData) {
            book.author = yield getBookAuthors(book.id);
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
    const bookId = parseInt(id);
    try {
        const bookRequest = yield (0, dbQueries_1.getOneBookQuery)(bookId);
        const bookData = JSON.parse(JSON.stringify(bookRequest));
        if (bookData.length === 0) {
            return res.status(400).json({ error: 'No book with such id.', });
        }
        bookData[0].author = yield getBookAuthors(bookId);
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
            addAuthorToList(acc, item);
            return acc;
        }, []);
        if (!title.trim() || !year.trim() || !description.trim() || authorList.length === 0) {
            return res.status(400).json({ error: 'Not enough info to create new book' });
        }
        const authorIdsForNewBook = yield createListOfBookAuthors(authorList);
        const addedBook = yield (0, dbQueries_1.addOneBookQuery)(title, year, description);
        const newBookId = JSON.parse(JSON.stringify(addedBook)).insertId;
        yield (0, dbQueries_1.addBookAuthorRelationsQuery)(newBookId, authorIdsForNewBook);
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
    const bookId = parseInt(id);
    try {
        const bookRequest = yield (0, dbQueries_1.getOneBookQuery)(bookId);
        const bookData = JSON.parse(JSON.stringify(bookRequest));
        console.log(bookId);
        console.log(bookData);
        return res.status(500).json({ error: 'Internal Server Error' });
        if (bookData.length === 0) {
            return res.status(400).json({ error: 'No book with such id.', });
        }
        bookData[0].author = yield getBookAuthors(bookId);
        res.status(200).json({ data: bookData[0], });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteOneBook = deleteOneBook;
const addAuthorToList = (acc, item) => {
    const nameSurname = item.split(/\s+/);
    for (let i = 0; i < nameSurname.length; i++) {
        const word = nameSurname[i];
        nameSurname[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    const nameSurnameCapitalized = nameSurname.join(' ').trim();
    if (nameSurnameCapitalized.length !== 0) {
        acc.push(nameSurnameCapitalized);
    }
};
const createListOfBookAuthors = (authorList) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    for (const author of authorList) {
        const isAuthorExistResponse = yield (0, dbQueries_1.getOneAuthorQuery)(author);
        const isAuthorExist = JSON.parse(JSON.stringify(isAuthorExistResponse));
        if (isAuthorExist.length !== 0) {
            result.push(isAuthorExist[0].id);
            continue;
        }
        else {
            const addedAuthor = yield (0, dbQueries_1.addOneAuthorQuery)(author);
            const newAuthorId = JSON.parse(JSON.stringify(addedAuthor)).insertId;
            result.push(newAuthorId);
        }
    }
    return result;
});
const getBookAuthors = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookAuthorsRequest = yield (0, dbQueries_1.getBookAuthorsQuery)(bookId);
    const bookAuthorsData = JSON.parse(JSON.stringify(bookAuthorsRequest));
    const authorsList = bookAuthorsData.reduce((acc, item, index) => {
        if (bookAuthorsData.length - 1 === index) {
            acc += item.name;
            return acc;
        }
        acc += item.name + ', ';
        return acc;
    }, '');
    return authorsList;
});
