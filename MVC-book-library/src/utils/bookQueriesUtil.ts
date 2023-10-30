import {
    addOneAuthorQuery,
    getOneAuthorQuery,
    findBooksNeedToDelete,
    getBookAuthorsQuery,
    deleteBook,
    deleteBookAuthorConnections,
    getAuthorBooks,
    deleteAuthor
} from '../db/dbQueries';

type AuthorListItem = { name: string, id: number };

const handleQueryResponse = async (callback, ...args: (string | number | null)[]) => {
    const queryResult = await callback(...args);
    return JSON.parse(JSON.stringify(queryResult));
}

const createStringOfAuthors = (bookAuthorsData: AuthorListItem[]) => {
    return bookAuthorsData.reduce((acc: string, item: AuthorListItem, index: number) => {
        if (bookAuthorsData.length - 1 === index) {
            acc += item.name;
            return acc;
        }

        acc += item.name + ', ';

        return acc;
    }, '');
}

const capitalizeAuthorName = (item: string) => {
    const nameSurname = item.split(/\s+/);

    for (let i = 0; i < nameSurname.length; i++) {
        const word = nameSurname[i];
        nameSurname[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return nameSurname.join(' ').trim();
}

const createListOfBookAuthors = async (authorList: string[]) => {
    const result = [];

    for (const author of authorList) {
        const isAuthorExist = await handleQueryResponse(getOneAuthorQuery, author);

        if (isAuthorExist.length !== 0) {
            result.push(isAuthorExist[0].id);
            continue;
        } else {
            const newAuthorId = await handleQueryResponse(addOneAuthorQuery, author);
            result.push(newAuthorId.insertId);
        }
    }

    return result;
}

const deleteBookFromDB = async () => {
    const bookListToDelete = await handleQueryResponse(findBooksNeedToDelete);
    for (const book of bookListToDelete) {
        const bookId = book.id;
        const bookAuthorsData = await handleQueryResponse(getBookAuthorsQuery, bookId);
        await deleteBook(bookId);
        await deleteBookAuthorConnections(bookId);

        for (const authorData of bookAuthorsData) {
            const authorHasBooksData = await handleQueryResponse(getAuthorBooks, authorData.id);
            if (authorHasBooksData.length === 0) {
                await deleteAuthor(authorData.id);
            }
        }
    }
}
export {
    handleQueryResponse,
    createStringOfAuthors,
    capitalizeAuthorName,
    createListOfBookAuthors,
    deleteBookFromDB
};