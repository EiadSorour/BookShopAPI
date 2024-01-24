import {NextFunction, Request,Response} from "express";

import httpStatusText from "../utils/httpStatusText";
import book_queries from "../utils/book_queries";
import Book from "../interfaces/book_interface";
import asyncWrapper from "../middlewares/asyncWrapper";
import AppError from "../utils/appError";

class BookController{

    constructor(){}

    public getAllBooks = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const allBooks:Book[] = await book_queries.getAllBooks();
            return res.status(200).json({status: httpStatusText.SUCCESS , data:allBooks});
        }
    )

    public getBook = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const bookID:number = Number(req.params.bookID);
            const book:Book = await book_queries.getBook(bookID);
            if(!book){
                const error = new AppError(httpStatusText.FAIL , 400, "This book doesn't exist");
                return next(error);
            }
            return res.status(200).json({status: httpStatusText.SUCCESS , data:{book}});
        }
    )

    public updateBook = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const bookID:number = Number(req.params.bookID);
            const oldBook:Book = await book_queries.getBook(bookID);
            
            if(!oldBook){
                const error = new AppError(httpStatusText.FAIL, 400, "This book doesn't exist");
                return next(error);
            }

            const updatedBook:Book = {
                id: bookID,
                title: req.body.title || oldBook.title,
                price: (typeof req.body.price == "undefined"? oldBook.price : req.body.price),
                quantity_in_stock: (typeof req.body.quantity_in_stock == "undefined"? oldBook.quantity_in_stock : req.body.quantity_in_stock)
            }
    
            const book:Book = await book_queries.updateBook(updatedBook);
            return res.status(200).json({status: httpStatusText.SUCCESS , data:{book}});
        }
    )

    public deleteBook = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const bookID:number = Number(req.params.bookID);
            await book_queries.deleteBook(bookID);
            return res.status(200).json({status: httpStatusText.SUCCESS , data:{message:"Deleted Successfully"}});
        }
    )

    public addBook = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const book:Book = {
                title: req.body.title,
                price: req.body.price,
                quantity_in_stock: req.body.quantity_in_stock,
            }
        
            await book_queries.addBook(book);
            return res.status(201).json({status: httpStatusText.SUCCESS , data:{message:"Created Successfully"}});
        }
    )

}

export default new BookController();