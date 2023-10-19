import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getBooksList() {
    return this.httpClient.get('/assets/books.json');
  }
}
