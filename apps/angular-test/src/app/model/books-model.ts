export interface BooksModel {
    id: string;
    name: string;
    img: string;
    publication_date: Date;
    genre: string;
    excerpt: string;
    author: string[];
    publisher: string;
    edit?: string;
    delete?: string;
}