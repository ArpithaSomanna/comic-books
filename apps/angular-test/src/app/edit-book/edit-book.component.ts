import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { PublishersList, AuthorsList } from '../model/books.constants';
import { BooksService } from '../service/books.service';
import { ErrorMessageService } from '../service/error-message.service';
import { BooksModel } from '../model/books-model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { Store } from '@ngrx/store';
import { updateBook } from '../store/books.actions';
import { bookSelector } from '../store/books.state';

@Component({
  selector: 'angular-monorepo-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, MaterialModule, ReactiveFormsModule, HeaderNavComponent, RouterModule],
  providers: [BooksService, ErrorMessageService]
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  errorMessage: any = '';
  publishersList: string[] = PublishersList;
  authorsList: string[] = AuthorsList;
  booksList!: BooksModel[];
  id!: string;
  constructor(
    private booksService: BooksService,
    private errorMessageService: ErrorMessageService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<BooksModel>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this.getSelectedBook();
    });
  }

  getSelectedBook() {
    this.store.select(bookSelector).subscribe(data => {
      this.booksList = data;
    })
    this.createBookForm(this.booksList.find(data => data.id === this.id) as BooksModel);
  }

  createBookForm(data: BooksModel) {
    this.bookForm = this.formBuilder.group({
      id: [{value: data.id, disabled: true}],
      name: [data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      img: [data.img, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      genre: [data.genre],
      excerpt: [data.excerpt],
      author: [data.author, Validators.required],
      publisher: [data.publisher],
      publication_date: [data.publication_date, Validators.required]
    });
  }

  getErrorMessage(controls: ValidationErrors, hint: string): string {
    return this.errorMessageService.getErrorMessage(controls, hint);
  }

  onEditBook() {
    this.store.dispatch(updateBook(this.bookForm.getRawValue()));
    this.router.navigate(['../']);
  }
}
