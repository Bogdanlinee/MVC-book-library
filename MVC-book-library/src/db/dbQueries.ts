import {db} from '../db/dbConnection';

const getOneBookQuery = (bookId: number) => {
    const queryString = `SELECT * FROM book_library.books WHERE id=${bookId}`;
    return promise(queryString);
}

const getAllBooksQuery = (limit: number, offset: number, search: string | null) => {
    const searchString = search ? `WHERE title LIKE '%${search}%'` : ``;
    const queryString = `SELECT * FROM book_library.books ${searchString} LIMIT ${limit} OFFSET ${offset}`;
    return promise(queryString);
}

const getBooksQuantity = () => {
    const queryString = `SELECT COUNT(*) AS count FROM book_library.books;`;
    return promise(queryString);
}

const getBookAuthorsQuery = (bookId: number) => {
    const queryString = `
        SELECT authors.name, authors.id
        from authors
        join authors_books on authors.id = authors_books.author_id
        where authors_books.book_id = ${bookId}`;
    return promise(queryString);
}

const getOneAuthorQuery = (authorName: string) => {
    const queryString = `SELECT * FROM book_library.authors where name='${authorName}';`;
    return promise(queryString);
}

const addOneAuthorQuery = (authorName: string) => {
    const queryString = `INSERT INTO book_library.authors (name) VALUES ('${authorName}');`;
    return promise(queryString);
}

const addOneBookQuery = (title: string, year: string, description: string) => {
    const query = `INSERT INTO book_library.books (title, year, description) VALUES (?, ?, ?)`;
    return promise(query, [title, year, description]);
}

const deleteBook = (bookId: number) => {
    const queryString = `DELETE FROM book_library.books WHERE id=${bookId};`;
    return promise(queryString);
}

const getAuthorBooks = (authorId: number) => {
    const queryString = `SELECT * FROM book_library.authors_books WHERE author_id=${authorId};`;
    return promise(queryString);
}
const deleteAuthor = (authorId: number) => {
    const queryString = `DELETE FROM book_library.authors WHERE id=${authorId};`;
    return promise(queryString);
}

const deleteBookAuthorConnections = (bookId: number) => {
    const queryString = `DELETE FROM book_library.authors_books WHERE book_id=${bookId};`;
    return promise(queryString);
}

const addBookAuthorRelationsQuery = (bookId: number, bookAuthors: number[]) => {
    let valuesToAdd = '';

    for (let author = 0; author < bookAuthors.length; author++) {
        if (author === bookAuthors.length - 1) {
            valuesToAdd += `(${bookId}, ${bookAuthors[author]})`;
            continue;
        }
        valuesToAdd += `(${bookId}, ${bookAuthors[author]}), `;
    }

    const queryString = `INSERT INTO book_library.authors_books (book_id, author_id) VALUES ${valuesToAdd};`;
    return promise(queryString)
}

const getStatsQueries = (bookId: number) => {
    const queryString = `SELECT * FROM book_library.statistic WHERE id=${bookId}`;
    return promise(queryString);
}

const addBookToStatsTable = (bookId: number) => {
    const queryString = `INSERT INTO book_library.statistic (id, views, clicks) VALUES (${bookId}, 0, 0);`;
    return promise(queryString);
}


const increasePageViews = (bookId: number, viewsValue: number) => {
    const queryString = `UPDATE book_library.statistic SET views=${viewsValue} WHERE id=${bookId}`;
    return promise(queryString);
}

const increasePageClicks = (bookId: number, clicksValue: number) => {
    const queryString = `UPDATE book_library.statistic SET clicks=${clicksValue} WHERE id=${bookId}`;
    return promise(queryString);
}

const bookMarkToDelete = (bookId: number) => {
    const queryString = `UPDATE book_library.books SET deleted='1' WHERE (id=${bookId})`;
    return promise(queryString);
}

const findBooksNeedToDelete = () => {
    const queryString = `SELECT * FROM book_library.books WHERE deleted='1';`;
    return promise(queryString);
}

const promise = (query: string, args?: string[]) => {
    if (args) {
        return new Promise((resolve, reject) => {
            db.query(query, args, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            db.query(query, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    }
}

export {
    getBookAuthorsQuery,
    getOneBookQuery,
    getAllBooksQuery,
    getOneAuthorQuery,
    addOneAuthorQuery,
    addOneBookQuery,
    addBookAuthorRelationsQuery,
    getBooksQuantity,
    deleteBook,
    deleteBookAuthorConnections,
    deleteAuthor,
    getAuthorBooks,
    getStatsQueries,
    increasePageViews,
    increasePageClicks,
    addBookToStatsTable,
    bookMarkToDelete,
    findBooksNeedToDelete
}