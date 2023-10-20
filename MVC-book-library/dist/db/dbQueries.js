"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOneAuthorQuery = exports.getOneAuthorQuery = exports.getAllBooksQuery = exports.getOneBookQuery = exports.getBookAuthorsQuery = void 0;
const dbConnection_1 = require("../db/dbConnection");
const getOneBookQuery = (bookId) => {
    const queryString = `SELECT * FROM book_library.books WHERE id=${bookId}`;
    return new Promise((resolve, reject) => {
        dbConnection_1.db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
exports.getOneBookQuery = getOneBookQuery;
const getAllBooksQuery = () => {
    const queryString = `SELECT * FROM book_library.books`;
    return new Promise((resolve, reject) => {
        dbConnection_1.db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
exports.getAllBooksQuery = getAllBooksQuery;
const getBookAuthorsQuery = (bookId) => {
    const queryString = `
        SELECT authors.name
        from authors
        join authors_books on authors.id = authors_books.author_id
        where authors_books.book_id = ${bookId}`;
    return new Promise((resolve, reject) => {
        dbConnection_1.db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
exports.getBookAuthorsQuery = getBookAuthorsQuery;
const getOneAuthorQuery = (authorName) => {
    const queryString = `SELECT * FROM book_library.authors where name='${authorName}';`;
    return new Promise((resolve, reject) => {
        dbConnection_1.db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
exports.getOneAuthorQuery = getOneAuthorQuery;
const addOneAuthorQuery = (authorName) => {
    // "INSERT INTO `book_library`.`authors` (`id`, `name`) VALUES (''," + authorName + "');"
    const queryString = "INSERT INTO `book_library`.`authors` (`name`) VALUES ('" + authorName + "');";
    return new Promise((resolve, reject) => {
        dbConnection_1.db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
exports.addOneAuthorQuery = addOneAuthorQuery;
