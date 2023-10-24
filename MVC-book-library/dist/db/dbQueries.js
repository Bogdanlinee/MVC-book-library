"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksQuantity = exports.addBookAuthorRelationsQuery = exports.addOneBookQuery = exports.addOneAuthorQuery = exports.getOneAuthorQuery = exports.getAllBooksQuery = exports.getOneBookQuery = exports.getBookAuthorsQuery = void 0;
const dbConnection_1 = require("../db/dbConnection");
const getOneBookQuery = (bookId) => {
    const queryString = `SELECT * FROM book_library.books WHERE id=${bookId}`;
    return promise(queryString);
};
exports.getOneBookQuery = getOneBookQuery;
const getAllBooksQuery = (limit, offset) => {
    const queryString = `SELECT * FROM book_library.books LIMIT ${limit} OFFSET ${offset}`;
    return promise(queryString);
};
exports.getAllBooksQuery = getAllBooksQuery;
const getBookAuthorsQuery = (bookId) => {
    const queryString = `
        SELECT authors.name
        from authors
        join authors_books on authors.id = authors_books.author_id
        where authors_books.book_id = ${bookId}`;
    return promise(queryString);
};
exports.getBookAuthorsQuery = getBookAuthorsQuery;
const getOneAuthorQuery = (authorName) => {
    const queryString = `SELECT * FROM book_library.authors where name='${authorName}';`;
    return promise(queryString);
};
exports.getOneAuthorQuery = getOneAuthorQuery;
const addOneAuthorQuery = (authorName) => {
    const queryString = "INSERT INTO `book_library`.`authors` (`name`) VALUES ('" + authorName + "');";
    return promise(queryString);
};
exports.addOneAuthorQuery = addOneAuthorQuery;
const addOneBookQuery = (title, year, description) => {
    // const queryString = "INSERT INTO `book_library`.`books` (`title`, `year`, `description`) VALUES (" + "'" + title + "'," + "'" + year + "'," + "'" + description + "'" + ");";
    const query = "INSERT INTO `book_library`.`books` (`title`, `year`, `description`) VALUES (?, ?, ?)";
    return promise(query, [title, year, description]);
};
exports.addOneBookQuery = addOneBookQuery;
const getBooksQuantity = () => {
    const queryString = "SELECT COUNT(*) AS count FROM `book_library`.`books`;";
    return promise(queryString);
};
exports.getBooksQuantity = getBooksQuantity;
const addBookAuthorRelationsQuery = (bookId, bookAuthors) => {
    let valuesToAdd = '';
    for (let author = 0; author < bookAuthors.length; author++) {
        if (author === bookAuthors.length - 1) {
            valuesToAdd += `(${bookId}, ${bookAuthors[author]})`;
            continue;
        }
        valuesToAdd += `(${bookId}, ${bookAuthors[author]}), `;
    }
    const queryString = "INSERT INTO book_library.authors_books (book_id, author_id) VALUES " + valuesToAdd + ";";
    return promise(queryString);
};
exports.addBookAuthorRelationsQuery = addBookAuthorRelationsQuery;
const promise = (query, args) => {
    if (args) {
        return new Promise((resolve, reject) => {
            dbConnection_1.db.query(query, args, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            dbConnection_1.db.query(query, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
};
