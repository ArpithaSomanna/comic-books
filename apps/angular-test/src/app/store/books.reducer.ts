import { createAction, createReducer, on, props } from '@ngrx/store';
import { BooksModel } from '../model/books-model';

const initialBooksList = {
    data: [
        {
            "id": "1",
            "img": "https://source.unsplash.com/user/c_v_r/1900x800",
            "name": "Things Fall Apart",
            "genre": "Historical fiction",
            "excerpt": "A proud heart can survive a general failure because such a failure does not prick its pride.",
            "author": ["Chinua Achebe"],
            "publisher": "William Heinemann Ltd",
            "publication_date": new Date("10/10/1958")
        },
        {
            "id": "2",
            "img": "https://source.unsplash.com/user/c_v_r/100x100",
            "name": "Fairy tales",
            "genre": "Magical story",
            "excerpt": "Life itself is the most wonderful fairy tale",
            "author": ["Hans Christian Andersen"],
            "publisher": "Macmillan Publishers",
            "publication_date": new Date("01/02/1836")
        },
        {
            "id": "3",
            "img": "https://picsum.photos/200/300",
            "name": "The Divine Comedy",
            "genre": "Epic poetry",
            "excerpt": "Before me things create were none, save things Eternal, and eternal I endure. All hope abandon ye who enter here",
            "author": ["Dante Alighieri"],
            "publisher": ["Simon & Schuster"],
            "publication_date": new Date("10/03/1998")
        },
        {
            "id": "4",
            "img": "https://source.unsplash.com/user/c_v_r/1600×900",
            "name": "Pride and Prejudice",
            "genre": "Fiction",
            "excerpt": "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife",
            "author": "Jane Austen",
            "publisher": ["Simon & Schuster"],
            "publication_date": new Date("02/09/2000")
        },
        {
            "id": "5",
            "img": "https://source.unsplash.com/user/c_v_r/1900x800",
            "name": "The Decameron",
            "genre": "Novel",
            "excerpt": "the power of love to survive changes in fortune and to override human intelligence",
            "author": "Giovanni Boccaccio",
            "publisher": ["Filippo and Bernardo Giunti"],
            "publication_date": new Date("15/12/1991")
        },
        {
            "id": "6",
            "img": "https://source.unsplash.com/user/c_v_r/1900x800",
            "name": "Things Fall Apart",
            "genre": "Historical fiction",
            "excerpt": "A proud heart can survive a general failure because such a failure does not prick its pride.",
            "author": ["Chinua Achebe"],
            "publisher": "William Heinemann Ltd",
            "publication_date": new Date("10/10/1958")
        },
        {
            "id": "7",
            "img": "https://source.unsplash.com/user/c_v_r/100x100",
            "name": "Fairy tales",
            "genre": "Magical story",
            "excerpt": "Life itself is the most wonderful fairy tale",
            "author": ["Hans Christian Andersen"],
            "publisher": "Macmillan Publishers",
            "publication_date": new Date("01/02/1836")
        },
        {
            "id": "8",
            "img": "https://picsum.photos/200/300",
            "name": "The Divine Comedy",
            "genre": "Epic poetry",
            "excerpt": "Before me things create were none, save things Eternal, and eternal I endure. All hope abandon ye who enter here",
            "author": ["Dante Alighieri"],
            "publisher": ["Simon & Schuster"],
            "publication_date": new Date("10/03/1998")
        },
        {
            "id": "9",
            "img": "https://source.unsplash.com/user/c_v_r/1600×900",
            "name": "Pride and Prejudice",
            "genre": "Fiction",
            "excerpt": "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife",
            "author": "Jane Austen",
            "publisher": ["Simon & Schuster"],
            "publication_date": new Date("02/09/2000")
        },
        {
            "id": "10",
            "img": "https://source.unsplash.com/user/c_v_r/1900x800",
            "name": "The Decameron",
            "genre": "Novel",
            "excerpt": "the power of love to survive changes in fortune and to override human intelligence",
            "author": "Giovanni Boccaccio",
            "publisher": ["Filippo and Bernardo Giunti"],
            "publication_date": new Date("15/12/1991")
        }
    ]
}

export const addNewBook = createAction('addNewBook', props<{book: BooksModel}>());
export const deleteBook = createAction('booksList', props<{id: string}>());
export const updateBook = createAction('updateBook', props<{book: BooksModel}>());

const _counterReducer = createReducer(initialBooksList, 
on(addNewBook, (state: any, props: {book: BooksModel}) => {
    const tempData = state.data.concat([props.book]);
    console.log(tempData);
    return {
        ...state,
        data: tempData
    };
}),
on(deleteBook, (state: any, props: {id: string}) => {
    let tempData = JSON.parse(JSON.stringify(state));
    const idx = tempData.data.findIndex((book: any) => book.id === props.id);
    tempData = tempData.data.splice(idx, 1)
    return {
        ...state,
        data: tempData
    }
}),
on(updateBook, (state: any, props: {book: BooksModel}) => {
    let tempData = JSON.parse(JSON.stringify(state));
    tempData.data.some((updatedBook: BooksModel) => {
        if(updatedBook.id === props.book.id) {
            updatedBook.id = props.book.id;
            updatedBook.author = props.book.author;
            updatedBook.excerpt = props.book.excerpt;
            updatedBook.genre = props.book.genre;
            updatedBook.img = props.book.img;
            updatedBook.publisher = props.book.publisher;
            updatedBook.publication_date = props.book.publication_date;
            updatedBook.name = props.book.name;
        }
    });
    return tempData;
})
);

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}