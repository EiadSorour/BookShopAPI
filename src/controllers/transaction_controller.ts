import { Request,Response,NextFunction } from "express";

import client_queries from "../utils/client_queries";
import book_queries from "../utils/book_queries";
import httpStatusText from "../utils/httpStatusText";

const buyBook = async function(req:Request, res:Response , next:NextFunction){
    const clientID: number = Number(req.body.clientID);
    const bookID: number = Number(req.body.bookID);
    const bookQuantity: number = Number(req.params.quantity);

    const current_client = (await client_queries.getClient(clientID)).rows[0];
    const current_book = (await book_queries.getBook(bookID)).rows[0];

    if(Number(current_client.money_owned) >= Number(current_book.price)*bookQuantity && Number(current_book.quantity_in_stock) >= bookQuantity){
        current_client.money_owned -= current_book.price*bookQuantity;
        const newTotalBooksBought = Number(current_client.total_books_bought) + bookQuantity;
        current_client.total_books_bought = newTotalBooksBought;
        current_book.quantity_in_stock -= bookQuantity;
        await client_queries.updateClient(clientID,current_client.first_name,current_client.last_name,current_client.money_owned,current_client.total_books_bought);
        await book_queries.updateBook(bookID,current_book.title,current_book.price,current_book.quantity_in_stock);
        res.status(200).json({status: httpStatusText.SUCCESS , data:{message:"Bought successfully"}});
    }else{
        res.status(400).json({status: httpStatusText.ERROR , data:{message:"Client doesn't have enough money or book is out of stock"}});
    }
}

export default{
    buyBook
}