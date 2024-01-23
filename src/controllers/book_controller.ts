import {NextFunction, Request,Response} from "express";

import httpStatusText from "../utils/httpStatusText";
import book_queries from "../utils/book_queries";

const getAllBooks = async function( req:Request ,res:Response , next:NextFunction ){
    const result = await book_queries.getAllBooks();
    res.status(200).json({status: httpStatusText.SUCCESS , data:result.rows});
}

const getBook = async function( req:Request ,res:Response , next:NextFunction ){
    const bookID:number = Number(req.params.bookID);
    const result = await book_queries.getBook(bookID);
    res.status(200).json({status: httpStatusText.SUCCESS , data:{book:result.rows[0]}});
}

const updateBook = async function( req:Request ,res:Response , next:NextFunction ){
    const bookID:number = Number(req.params.bookID);
    const oldBook = (await book_queries.getBook(bookID)).rows[0];

    const title:string = req.body.title || oldBook.title;
    const price:number = req.body.price || oldBook.price;
    let quantityInStock:number = 0;
    if(!req.body.price && req.body.price != 0){
        quantityInStock = oldBook.quantityInStock;
    }else{
        quantityInStock = req.body.quantityInStock
    }

    const result = await book_queries.updateBook(bookID,title,price,quantityInStock);
    res.status(200).json({status: httpStatusText.SUCCESS , data:result.rows});
}

const deleteBook = async function( req:Request ,res:Response , next:NextFunction ){
    const bookID:number = Number(req.params.bookID);
    const result = await book_queries.deleteBook(bookID);
    res.status(200).json({status: httpStatusText.SUCCESS , data:result.rows});
}

const addBook = async function( req:Request ,res:Response , next:NextFunction ){
    const title:string = req.body.title;
    const price:number = req.body.price;
    const quantityInStock:number = req.body.quantityInStock;

    const result = await book_queries.addBook(title,price,quantityInStock);
    res.status(200).json({status: httpStatusText.SUCCESS , data:result.rows});
}

export default {
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
    addBook
}