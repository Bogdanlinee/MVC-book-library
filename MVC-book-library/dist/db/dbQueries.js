"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBooksNeedToDelete = exports.bookMarkToDelete = exports.addBookToStatsTable = exports.increasePageClicks = exports.increasePageViews = exports.getStatsQueries = exports.getAuthorBooks = exports.deleteAuthor = exports.deleteBookAuthorConnections = exports.deleteBook = exports.getBooksQuantity = exports.addBookAuthorRelationsQuery = exports.addOneBookQuery = exports.addOneAuthorQuery = exports.getOneAuthorQuery = exports.getAllBooksQuery = exports.getOneBookQuery = exports.getBookAuthorsQuery = void 0;
const dbConnection_1 = require("../db/dbConnection");
const getOneBookQuery = (bookId) => {
    const queryString = `SELECT * FROM book_library.books WHERE id=${bookId}`;
    return promise(queryString);
};
exports.getOneBookQuery = getOneBookQuery;
const getAllBooksQuery = (limit, offset, search) => {
    const searchString = search ? `WHERE title LIKE '%${search}%'` : ``;
    const queryString = `SELECT * FROM book_library.books ${searchString} LIMIT ${limit} OFFSET ${offset}`;
    return promise(queryString);
};
exports.getAllBooksQuery = getAllBooksQuery;
const getBooksQuantity = () => {
    const queryString = `SELECT COUNT(*) AS count FROM book_library.books;`;
    return promise(queryString);
};
exports.getBooksQuantity = getBooksQuantity;
const getBookAuthorsQuery = (bookId) => {
    const queryString = `
        SELECT authors.name, authors.id
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
    const queryString = `INSERT INTO book_library.authors (name) VALUES ('${authorName}');`;
    return promise(queryString);
};
exports.addOneAuthorQuery = addOneAuthorQuery;
const addOneBookQuery = (title, year, description) => {
    const query = `INSERT INTO book_library.books (title, year, description) VALUES (?, ?, ?)`;
    return promise(query, [title, year, description]);
};
exports.addOneBookQuery = addOneBookQuery;
const deleteBook = (bookId) => {
    const queryString = `DELETE FROM book_library.books WHERE id=${bookId};`;
    return promise(queryString);
};
exports.deleteBook = deleteBook;
const getAuthorBooks = (authorId) => {
    const queryString = `SELECT * FROM book_library.authors_books WHERE author_id=${authorId};`;
    return promise(queryString);
};
exports.getAuthorBooks = getAuthorBooks;
const deleteAuthor = (authorId) => {
    const queryString = `DELETE FROM book_library.authors WHERE id=${authorId};`;
    return promise(queryString);
};
exports.deleteAuthor = deleteAuthor;
const deleteBookAuthorConnections = (bookId) => {
    const queryString = `DELETE FROM book_library.authors_books WHERE book_id=${bookId};`;
    return promise(queryString);
};
exports.deleteBookAuthorConnections = deleteBookAuthorConnections;
const addBookAuthorRelationsQuery = (bookId, bookAuthors) => {
    let valuesToAdd = '';
    for (let author = 0; author < bookAuthors.length; author++) {
        if (author === bookAuthors.length - 1) {
            valuesToAdd += `(${bookId}, ${bookAuthors[author]})`;
            continue;
        }
        valuesToAdd += `(${bookId}, ${bookAuthors[author]}), `;
    }
    const queryString = `INSERT INTO book_library.authors_books (book_id, author_id) VALUES ${valuesToAdd};`;
    return promise(queryString);
};
exports.addBookAuthorRelationsQuery = addBookAuthorRelationsQuery;
const getStatsQueries = (bookId) => {
    const queryString = `SELECT * FROM book_library.statistic WHERE id=${bookId}`;
    return promise(queryString);
};
exports.getStatsQueries = getStatsQueries;
const addBookToStatsTable = (bookId) => {
    const queryString = `INSERT INTO book_library.statistic (id, views, clicks) VALUES (${bookId}, 0, 0);`;
    return promise(queryString);
};
exports.addBookToStatsTable = addBookToStatsTable;
const increasePageViews = (bookId, viewsValue) => {
    const queryString = `UPDATE book_library.statistic SET views=${viewsValue} WHERE id=${bookId}`;
    return promise(queryString);
};
exports.increasePageViews = increasePageViews;
const increasePageClicks = (bookId, clicksValue) => {
    const queryString = `UPDATE book_library.statistic SET clicks=${clicksValue} WHERE id=${bookId}`;
    return promise(queryString);
};
exports.increasePageClicks = increasePageClicks;
const bookMarkToDelete = (bookId) => {
    const queryString = `UPDATE book_library.books SET deleted='1' WHERE (id=${bookId})`;
    return promise(queryString);
};
exports.bookMarkToDelete = bookMarkToDelete;
const findBooksNeedToDelete = () => {
    const queryString = `SELECT * FROM book_library.books WHERE deleted='1';`;
    return promise(queryString);
};
exports.findBooksNeedToDelete = findBooksNeedToDelete;
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
