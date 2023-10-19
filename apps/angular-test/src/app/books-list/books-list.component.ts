import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from '../service/books.service';
import { MaterialModule } from '../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { BooksModel } from '../model/books-model';
import { MatPaginator } from '@angular/material/paginator';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { addBook, deleteBook, updateBook } from '../store/books.actions';
import { bookSelector } from '../store/books.state';

@Component({
  selector: 'angular-monorepo-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  standalone: true,
  imports: [CommonModule, 
    HttpClientModule, 
    MaterialModule, 
    RouterModule, 
    HeaderNavComponent,
  ],
  providers: [BooksService]
})
export class BooksListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'img', 'publication_date', 'genre', 'excerpt', 'author', 'publisher', 'edit', 'delete'];
  dataSource = new MatTableDataSource<BooksModel>();
  sortedData!: BooksModel[];
  date: any
  constructor(
    private booksService: BooksService,
    private store: Store<BooksModel>
  ) {}

  ngOnInit(): void {
    this.getBooksList();
    this.resetData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getBooksList() {
    this.store.select(bookSelector).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource._updateChangeSubscription();
    });
  }

  deleteExistingBook(id: string) {
    const index = this.dataSource.data.findIndex(dtaa => dtaa.id === id);
    this.store.dispatch(deleteBook(index));
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b): any => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortedData;
    this.dataSource._updateChangeSubscription();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  resetData() {
  }
}
