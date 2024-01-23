import {NextFunction, Request,Response} from "express";

import httpStatusText from "../utils/httpStatusText";
import book_queries from "../utils/book_queries";
import Book from "../interfaces/book_interface";

class BookController{

    constructor(){}

    public async getAllBooks(req:Request , res:Response, next: NextFunction): Promise<void>{
        const allBooks:Book[] = await book_queries.getAllBooks();
        res.status(200).json({status: httpStatusText.SUCCESS , data:allBooks});
    }

    public async getBook (req:Request , res:Response, next: NextFunction): Promise<void>{
        const bookID:number = Number(req.params.bookID);
        const book:Book = await book_queries.getBook(bookID);
        res.status(200).json({status: httpStatusText.SUCCESS , data:{book}});
    }

    public async updateBook(req:Request , res:Response, next: NextFunction): Promise<void>{
        const bookID:number = Number(req.params.bookID);
        const oldBook:Book = await book_queries.getBook(bookID);

        const updatedBook:Book = {
            id: bookID,
            title: req.body.title || oldBook.title,
            price: (typeof req.body.price == "undefined"? oldBook.price : req.body.price),
            quantity_in_stock: (typeof req.body.quantity_in_stock == "undefined"? oldBook.quantity_in_stock : req.body.quantity_in_stock)
        }

        const book:Book = await book_queries.updateBook(updatedBook);
        res.status(200).json({status: httpStatusText.SUCCESS , data:{book}});
    }

    public async deleteBook(req:Request , res:Response, next: NextFunction): Promise<void>{
        const bookID:number = Number(req.params.bookID);
        await book_queries.deleteBook(bookID);
        res.status(200).json({status: httpStatusText.SUCCESS , data:{message:"Deleted Successfully"}});
    }

    public async addBook(req:Request , res:Response, next: NextFunction): Promise<void>{
        const book:Book = {
            title: req.body.title,
            price: req.body.price,
            quantity_in_stock: req.body.quantity_in_stock,
        }
    
        await book_queries.addBook(book);
        res.status(201).json({status: httpStatusText.SUCCESS , data:{message:"Created Successfully"}});
    }
}

export default new BookController();