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
exports.deleteOneBook = exports.createOneBook = exports.getAllBooks = void 0;
const dbConnection_1 = require("../db/dbConnection");
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = dbConnection_1.db.query("SELECT * FROM book_library.books", function (err, result, fields) {
            if (err) {
                throw err;
            }
            let booksData = JSON.parse(JSON.stringify(result));
            res.status(200).json({ data: { books: booksData, } });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllBooks = getAllBooks;
const deleteOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteOneBook = deleteOneBook;
const createOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.status(200).redirect('/admin/');
});
exports.createOneBook = createOneBook;
