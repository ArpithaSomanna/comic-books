
import { createReducer, on } from '@ngrx/store';
import { addBook, deleteBook, getBooks, updateBook } from "./books.actions";
import { initialState } from './books.state';

export const bookReducer = createReducer(
    initialState,
    on(getBooks, (state, { books }) => [...books]),
    on(addBook, (state, { book }) => {
        const newBook = {...book};
        newBook.publication_date = new Date(book.publication_date);
        return [...state, newBook]
    }),
    on(deleteBook, (state, { index }) => {
        let newState = [...state]; 
        newState.splice(index, 1);
        return newState;
    }),
    on(updateBook, (state, { book }) => {
        let newState = [...state]; 
        newState = newState.map(data => {
            if((data.id === book.id)) {
                data = book;
            }
            return data;
        });
        return newState;        
    })
);