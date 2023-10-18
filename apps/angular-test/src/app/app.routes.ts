import { Route } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

export const appRoutes: Route[] = [
    {
        path: '', pathMatch: 'full', redirectTo: '/list'
    },
    {
        path: 'list', component: BooksListComponent
    },
    {
        path: 'add-book', loadChildren: () => import('./add-book/add-book.module').then(m => m.AddBookModule)
    },
    {
        path: 'book/:id', component: EditBookComponent
    }
];
