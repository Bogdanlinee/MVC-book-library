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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneBook = exports.getBook = exports.getAllBooks = void 0;
const dbQueries_1 = require("../db/dbQueries");
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booksRequest = yield (0, dbQueries_1.getAllBooksQuery)();
        const booksData = JSON.parse(JSON.stringify(booksRequest));
        res.status(200).json({ data: { books: booksData, } });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllBooks = getAllBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: bookId } = req.params;
    try {
        const bookRequest = yield (0, dbQueries_1.getOneBookQuery)(bookId);
        const bookData = JSON.parse(JSON.stringify(bookRequest));
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
        if (bookData.length === 0) {
            return res.status(400).json({ error: 'No book with such id.', });
        }
        bookData[0].author = authorsList;
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
            const nameSurname = item.split(/\s+/);
            for (let i = 0; i < nameSurname.length; i++) {
                const word = nameSurname[i];
                nameSurname[i] = word.charAt(0).toUpperCase() + word.slice(1);
            }
            const nameSurnameCapitalized = nameSurname.join(' ').trim();
            if (nameSurnameCapitalized.length !== 0) {
                acc.push(nameSurnameCapitalized);
            }
            return acc;
        }, []);
        for (const author of authorList) {
            const isAuthorExistResponse = yield (0, dbQueries_1.getOneAuthorQuery)(author);
            const isAuthorExist = JSON.parse(JSON.stringify(isAuthorExistResponse));
            if (isAuthorExist.length !== 0) {
                continue;
            }
            else {
                console.log(yield (0, dbQueries_1.addOneAuthorQuery)(author));
            }
        }
        if (!title.trim() || !year.trim() || !description.trim() || authorList.length === 0) {
            return res.status(400).json({ error: 'Not enough info to create new book' });
        }
        res.status(200).json({ success: true });
        // res.status(200).redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createOneBook = createOneBook;
