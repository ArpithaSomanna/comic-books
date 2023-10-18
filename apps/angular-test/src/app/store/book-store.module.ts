import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './books.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ data: counterReducer })
  ],
  exports: [
    StoreModule
  ]
})
export class BookStoreModule { }
