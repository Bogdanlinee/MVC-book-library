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
exports.escapeHtml = exports.deleteBookFromDB = exports.createListOfBookAuthors = exports.capitalizeAuthorName = exports.createStringOfAuthors = exports.handleQueryResponse = void 0;
const dbQueries_1 = require("../db/dbQueries");
const handleQueryResponse = (callback, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResult = yield callback(...args);
    return JSON.parse(JSON.stringify(queryResult));
});
exports.handleQueryResponse = handleQueryResponse;
const createStringOfAuthors = (bookAuthorsData) => {
    return bookAuthorsData.reduce((acc, item, index) => {
        if (bookAuthorsData.length - 1 === index) {
            acc += item.name;
            return acc;
        }
        acc += item.name + ', ';
        return acc;
    }, '');
};
exports.createStringOfAuthors = createStringOfAuthors;
const capitalizeAuthorName = (item) => {
    const nameSurname = item.split(/\s+/);
    for (let i = 0; i < nameSurname.length; i++) {
        const word = nameSurname[i];
        nameSurname[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return escapeHtml(nameSurname.join(' ').trim());
};
exports.capitalizeAuthorName = capitalizeAuthorName;
const createListOfBookAuthors = (authorList) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    for (const author of authorList) {
        const isAuthorExist = yield handleQueryResponse(dbQueries_1.getOneAuthorQuery, author);
        if (isAuthorExist.length !== 0) {
            result.push(isAuthorExist[0].id);
            continue;
        }
        else {
            const newAuthorId = yield handleQueryResponse(dbQueries_1.addOneAuthorQuery, escapeHtml(author));
            result.push(newAuthorId.insertId);
        }
    }
    return result;
});
exports.createListOfBookAuthors = createListOfBookAuthors;
const deleteBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookListToDelete = yield handleQueryResponse(dbQueries_1.findBooksNeedToDelete);
    for (const book of bookListToDelete) {
        const bookId = book.id;
        const bookAuthorsData = yield handleQueryResponse(dbQueries_1.getBookAuthorsQuery, bookId);
        yield (0, dbQueries_1.deleteBook)(bookId);
        yield (0, dbQueries_1.deleteBookAuthorConnections)(bookId);
        yield (0, dbQueries_1.deleteStatsConnections)(bookId);
        for (const authorData of bookAuthorsData) {
            const authorHasBooksData = yield handleQueryResponse(dbQueries_1.getAuthorBooks, authorData.id);
            if (authorHasBooksData.length === 0) {
                yield (0, dbQueries_1.deleteAuthor)(authorData.id);
            }
        }
    }
});
exports.deleteBookFromDB = deleteBookFromDB;
const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
};
exports.escapeHtml = escapeHtml;
