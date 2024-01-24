import { Request,Response,NextFunction } from "express";

import client_queries from "../utils/client_queries";
import book_queries from "../utils/book_queries";
import httpStatusText from "../utils/httpStatusText";
import Client from "../interfaces/client_interface";
import Book from "../interfaces/book_interface";
import asyncWrapper from "../middlewares/asyncWrapper";
import AppError from "../utils/appError";

class TransactionController{
    constructor(){}

    public buyBook = asyncWrapper(
        async (req:Request, res:Response , next:NextFunction)=>{

            const bookQuantity:number = Number(req.params.quantity);
            const current_client:Client = await client_queries.getClient(req.body.clientID);
            const current_book:Book = await book_queries.getBook(req.body.bookID);

            if(!current_client){
                const error = new AppError(httpStatusText.FAIL , 400, "This client doesn't exist");
                return next(error);
            }else if(!current_book){
                const error = new AppError(httpStatusText.FAIL , 400, "This book doesn't exist");
                return next(error);
            }else if(current_client.money_owned < current_book.price*bookQuantity){
                const error = new AppError(httpStatusText.FAIL , 400, "Client doesn't have enough money to make this transaction");
                return next(error);
            }else if(current_book.quantity_in_stock < bookQuantity){
                const error = new AppError(httpStatusText.FAIL , 400, "Book doesn't have enough copies");
                return next(error);
            }
        
            current_client.money_owned -= current_book.price*bookQuantity;
            current_book.quantity_in_stock -= bookQuantity;
            current_client.total_books_bought = Number(current_client.total_books_bought) +bookQuantity;
            
            await client_queries.updateClient(current_client);
            await book_queries.updateBook(current_book);

            const responseMessage:string = `Client ${current_client.first_name} ${current_client.last_name} bought ${bookQuantity} copies of book ${current_book.title}`; 
            return res.status(200).json({status: httpStatusText.SUCCESS , data:{message:responseMessage}});
        }
    )

}

export default new TransactionController();