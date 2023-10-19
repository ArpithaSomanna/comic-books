import { Component, OnInit } from '@angular/core';
import { BooksService } from '../service/books.service';
import {  FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ErrorMessageService } from '../service/error-message.service';
import { AuthorsList, PublishersList } from '../model/books.constants';
import { BooksModel } from '../model/books-model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addBook } from '../store/books.actions';
import { bookSelector } from '../store/books.state';

@Component({
  selector: 'angular-monorepo-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  errorMessage: any = '';
  publishersList: string[] = PublishersList;
  authorsList: string[] = AuthorsList;
  booksList!: BooksModel[];
  constructor(
    private booksService: BooksService,
    private errorMessageService: ErrorMessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<BooksModel>
  ) {}

  ngOnInit(): void {
    this.createBookForm();
    this.store.select(bookSelector).subscribe(data => {
      this.booksList = data;
    });
  }

  createBookForm() {
    this.bookForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      img: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      genre: [''],
      excerpt: [''],
      author: [[''], [Validators.required]],
      publisher: [''],
      publication_date: [Date, Validators.required]
    });
  }

  getErrorMessage(controls: ValidationErrors, hint: string): string {
    return this.errorMessageService.getErrorMessage(controls, hint);
  }

  onAddBook() {    
    this.bookForm.get('publication_date')?.setValue(new Date('11/10/2023'));
    this.bookForm.get('id')?.setValue((this.booksList.length + 1).toString());
    this.store.dispatch(addBook(this.bookForm.getRawValue()));
    console.log(this.bookForm.getRawValue())
    this.router.navigate(['../']);
  }
}
