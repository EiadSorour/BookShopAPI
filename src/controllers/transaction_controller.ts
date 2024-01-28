import { Request,Response,NextFunction } from "express";

import bookModel from "../models/book_model";
import clientModel from "../models/client_model";
import orderModel from "../models/order_model";
import Order from "../interfaces/order_interface";
import httpStatusText from "../utils/httpStatusText";
import asyncWrapper from "../middlewares/asyncWrapper";
import AppError from "../utils/appError";

class TransactionController{
    constructor(){}

    public buyBook = asyncWrapper(
        async (req:Request, res:Response , next:NextFunction)=>{

            const bookQuantity:number = Number(req.params.quantity);
            const current_client = await clientModel.findOne({where:{id:req.body.clientID}});
            const current_book = await bookModel.findOne({where:{id:req.body.bookID}});

            console.log(current_client);
            console.log(current_book);
            

            if(!current_client){
                const error = new AppError(httpStatusText.FAIL , 400, "This client doesn't exist");
                return next(error);
            }else if(!current_book){
                const error = new AppError(httpStatusText.FAIL , 400, "This book doesn't exist");
                return next(error);
            }else if(current_client.dataValues.money_owned < current_book.dataValues.price*bookQuantity){
                const error = new AppError(httpStatusText.FAIL , 400, "Client doesn't have enough money to make this transaction");
                return next(error);
            }else if(current_book.dataValues.quantity_in_stock < bookQuantity){
                const error = new AppError(httpStatusText.FAIL , 400, "Book doesn't have enough copies");
                return next(error);
            }
        
            current_client.dataValues.money_owned -= current_book.dataValues.price*bookQuantity;
            current_book.dataValues.quantity_in_stock -= bookQuantity;
            current_client.dataValues.total_books_bought = Number(current_client.dataValues.total_books_bought) +bookQuantity;
            
            const order:Order = {
                quantity:bookQuantity,
                clientId: (current_client as any).id,
                bookId: (current_book as any).id
            }
            await orderModel.create(order as any);

            await clientModel.update(current_client.dataValues , {where: {id:req.body.clientID}});
            await bookModel.update(current_book.dataValues , {where: {id:req.body.bookID}});

            const responseMessage:string = `Client ${current_client.dataValues.first_name} ${current_client.dataValues.last_name} bought ${bookQuantity} copies of book ${current_book.dataValues.title}`; 
            return res.status(200).json({status: httpStatusText.SUCCESS , data:{message:responseMessage}});
        }
    )

}

export default new TransactionController();