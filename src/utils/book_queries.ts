import db_client from "../db/db_client";

const getAllBooks = async function(){
    return await db_client.query("SELECT * FROM book;");
}

const getBook = async function(bookID:number){
    return await db_client.query(`SELECT * FROM book WHERE id=${bookID};`);
}

const updateBook = async function(bookID:number,title:string, price:number , quantityInStock:number){
    return await db_client.query(`UPDATE book SET title='${title}' , price=${price} , quantity_in_stock=${quantityInStock} WHERE id=${bookID};`);
}

const deleteBook = async function(bookID:number){
    return await db_client.query(`DELETE FROM book WHERE id=${bookID};`);
}

const addBook = async function(title:string, price:number , quantityInStock:number){
    return await db_client.query(`INSERT INTO book (title,price,quantity_in_stock) VALUES ('${title}' , ${price}, ${quantityInStock});`);
}

export default {
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
    addBook
}