import {db} from '../db/dbConnection';

const getOneBookQuery = (bookId: string) => {
    const queryString = `SELECT * FROM book_library.books WHERE id=${bookId}`;

    return new Promise((resolve, reject) => {
        db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

const getAllBooksQuery = () => {
    const queryString = `SELECT * FROM book_library.books`;

    return new Promise((resolve, reject) => {
        db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

const getBookAuthorsQuery = (bookId: string) => {
    const queryString = `
        SELECT authors.name
        from authors
        join authors_books on authors.id = authors_books.author_id
        where authors_books.book_id = ${bookId}`;

    return new Promise((resolve, reject) => {
        db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}
const getOneAuthorQuery = (authorName: string) => {
    const queryString = `SELECT * FROM book_library.authors where name='${authorName}';`;

    return new Promise((resolve, reject) => {
        db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

const addOneAuthorQuery = (authorName: string) => {
    // "INSERT INTO `book_library`.`authors` (`id`, `name`) VALUES (''," + authorName + "');"
    const queryString = "INSERT INTO `book_library`.`authors` (`name`) VALUES ('" + authorName + "');";

    return new Promise((resolve, reject) => {
        db.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

export {getBookAuthorsQuery, getOneBookQuery, getAllBooksQuery, getOneAuthorQuery, addOneAuthorQuery}