import { Request,Response,NextFunction } from "express";

import client_queries from "../utils/client_queries";
import book_queries from "../utils/book_queries";
import httpStatusText from "../utils/httpStatusText";
import Client from "../interfaces/client_interface";
import Book from "../interfaces/book_interface";

class TransactionController{
    constructor(){}

    public async buyBook(req:Request, res:Response , next:NextFunction){

        const bookQuantity:number = Number(req.params.quantity);
        const current_client:Client = await client_queries.getClient(req.body.clientID);
        const current_book:Book = await book_queries.getBook(req.body.bookID);
    
        if(current_client.money_owned >= current_book.price*bookQuantity && current_book.quantity_in_stock >= bookQuantity){
    
            current_client.money_owned -= current_book.price*bookQuantity;
            current_book.quantity_in_stock -= bookQuantity;
            current_client.total_books_bought = current_client.total_books_bought as number + bookQuantity;
            
            await client_queries.updateClient(current_client);
            await book_queries.updateBook(current_book);
    
            const responseMessage:string = `Client ${current_client.first_name} ${current_client.last_name} bought ${bookQuantity} copies of book ${current_book.title}`; 
            res.status(200).json({status: httpStatusText.SUCCESS , data:{message:responseMessage}});
        }else{
            res.status(400).json({status: httpStatusText.ERROR , data:{message:"Client doesn't have enough money or book is out of stock"}});
        }
    }

}

export default new TransactionController();