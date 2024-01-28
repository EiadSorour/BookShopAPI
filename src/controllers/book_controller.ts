import {NextFunction, Request,Response} from "express";

import httpStatusText from "../utils/httpStatusText";
import bookModel from "../models/book_model";
import Book from "../interfaces/book_interface";
import asyncWrapper from "../middlewares/asyncWrapper";
import AppError from "../utils/appError";

class BookController{

    constructor(){}

    public getAllBooks = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const allBooks = await bookModel.findAll();
            return res.status(200).json({status: httpStatusText.SUCCESS , data:allBooks});
        }
    )

    public getBook = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const bookID:number = Number(req.params.bookID);
            const book = await bookModel.findOne({where: {id:bookID}});
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
            const oldBook = await bookModel.findOne({where:{id:bookID}});
            
            if(!oldBook){
                const error = new AppError(httpStatusText.FAIL, 400, "This book doesn't exist");
                return next(error);
            }
    
            const book = (await bookModel.update({...req.body} , {where:{id:bookID}, returning:true }))[1];
            return res.status(200).json({status: httpStatusText.SUCCESS , data:{book}});
        }
    )

    public deleteBook = asyncWrapper(
        async (req:Request , res:Response, next: NextFunction)=>{
            const bookID:number = Number(req.params.bookID);
            
            const currentBook = await bookModel.findOne({ where:{id: bookID} });

            if(!currentBook){
                const error = new AppError(httpStatusText.FAIL, 400, "This book doesn't exist");
                return next(error);
            }
            
            await bookModel.destroy({where:{id:bookID}});
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

            await bookModel.create(book as any);
            return res.status(201).json({status: httpStatusText.SUCCESS , data:{message:"Created Successfully"}});
        }
    )

}

export default new BookController();