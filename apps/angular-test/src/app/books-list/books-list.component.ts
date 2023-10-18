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
import { BookStoreModule } from '../store/book-store.module';
import { Sort } from '@angular/material/sort';

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
    BookStoreModule
  ],
  providers: [BooksService]
})
export class BooksListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'img', 'publication_date', 'genre', 'excerpt', 'author', 'publisher', 'edit', 'delete'];
  dataSource = new MatTableDataSource<BooksModel>();
  sortedData!: BooksModel[];

  constructor(
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.getBooksList();
    this.resetData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getBooksList() {
    this.booksService.getBooksList().subscribe((res: any) => {
      this.dataSource.data = res;      
      this.sortedData = this.dataSource.data.slice();
    });
  }

  deleteBook(id: string) {
    this.booksService.deleteExistingBook(id);
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
    this.booksService.getBooksFromStorage().subscribe(res => {
      this.dataSource.data = res.data;
      this.dataSource._updateChangeSubscription();
      this.sortedData = this.dataSource.data.slice();
    });
  }
}
