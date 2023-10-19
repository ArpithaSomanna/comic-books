import { BooksModel } from "../model/books-model";
import { createAction } from '@ngrx/store';

export const getBooks = createAction('[Book] Get Book', (books: BooksModel[]) => ({
    books,
}));

export const addBook = createAction('[Book] Add Book', (book: BooksModel) => ({
    book,
}));

export const deleteBook = createAction('[Book] Delete Book', (index: number) => ({
    index,
}));

export const updateBook = createAction('[Book] Update Book', (book: BooksModel) => ({
    book,
}));