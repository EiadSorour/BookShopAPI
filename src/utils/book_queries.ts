import db_client from "../db/db_client";
import Book from "../interfaces/book_interface";

class BookQueries{

    constructor(){}

    public async getAllBooks(): Promise<Book[]>{
        const allBooks:Book[] = (await db_client.query("SELECT * FROM book;")).rows;
        return allBooks;
    }

    public async getBook(bookID: number): Promise<Book>{
        const book:Book = (await db_client.query(`SELECT * FROM book WHERE id=${bookID};`)).rows[0];
        return book;
    }

    public async updateBook(book:Book): Promise<Book>{
        await db_client.query(`UPDATE book SET title='${book.title}' , price=${book.price} , quantity_in_stock=${book.quantity_in_stock} WHERE id=${book.id};`);
        const updatedBook:Book = await this.getBook(book.id as number);
        return updatedBook;
    }

    public async deleteBook(bookID:number): Promise<void>{
        await db_client.query(`DELETE FROM book WHERE id=${bookID};`);
    }

    public async addBook(book:Book): Promise<void>{
        await db_client.query(`INSERT INTO book (title,price,quantity_in_stock) VALUES ('${book.title}' , ${book.price}, ${book.quantity_in_stock});`); 
    }
}

export default new BookQueries;