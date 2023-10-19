import { BooksModel } from "../model/books-model";
import { createSelector } from '@ngrx/store';

export const initialState: BooksModel[] = [];

export const bookSelector = createSelector(
    (state: any) => state.books,
    (books: BooksModel[]) => books
)