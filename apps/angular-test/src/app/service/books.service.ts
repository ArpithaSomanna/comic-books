import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import { addNewBook, defaultState, deleteBook, resetBook, updateBook } from '../store/books.actions';
import { BooksModel } from '../model/books-model';
import { addNewBook, deleteBook, updateBook } from '../store/books.reducer';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<{data: {data: []}}>
  ) { }

  getBooksList() {
    return this.httpClient.get('/assets/books.json');
  }

  getBooksFromStorage() {
    return this.store.select('data');
  }

  addBookToStorage(book: BooksModel) {
    this.store.dispatch(addNewBook({book: book}));
  }

  deleteExistingBook(id: string) {
    this.store.dispatch(deleteBook({id: id}));
  }

  updateExistingBook(book: BooksModel) {
    this.store.dispatch(updateBook({book: book}));
  }
}
