import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AddBookComponent } from './add-book.component';
import { RouterModule, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../service/books.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMessageService } from '../service/error-message.service';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { BookStoreModule } from '../store/book-store.module';

const routes: Route[] = [
    {
        path: '', component: AddBookComponent
    }
]

@NgModule({
  declarations: [AddBookComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    HeaderNavComponent,
    BookStoreModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    BooksService,
    ErrorMessageService
  ]
})
export class AddBookModule { }
