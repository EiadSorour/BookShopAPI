import {NextFunction, Request,Response} from "express";

import httpStatusText from "../utils/httpStatusText";
import client_queries from "../utils/client_queries";

const getClient = async function(req:Request , res:Response , next:NextFunction){
    const clientID:number = Number(req.params.clientID);
    const result = await client_queries.getClient(clientID);
    res.status(200).json({status:httpStatusText.SUCCESS , data:{client: result.rows[0]}});
}

const getAllClients = async function(req:Request , res:Response , next:NextFunction){
    const result = await client_queries.getAllClients();
    res.status(200).json({status:httpStatusText.SUCCESS , data:result.rows});
}

const addClient = async function(req:Request , res:Response , next:NextFunction){
    const firstName:string = req.body.firstName;
    const lastName:string = req.body.lastName;
    const moneyOwned:number = req.body.moneyOwned;

    const result = await client_queries.insertIntoClient(firstName,lastName,moneyOwned);
    res.status(201).json({status: httpStatusText.SUCCESS , data:result.rows});
}

const updateClient = async function(req:Request , res:Response , next:NextFunction){
    const clientID:number = Number(req.params.clientID);
    const oldClient = (await client_queries.getClient(clientID)).rows[0];
    
    const firstName:string = req.body.firstName || oldClient.first_name;
    const lastName:string = req.body.lastName || oldClient.last_name;
    const moneyOwned:number = req.body.moneyOwned || oldClient.money_owned;
    const totalBooksBought:number = req.body.totalBooksBought || oldClient.total_books_bought;

    const result = await client_queries.updateClient(clientID,firstName,lastName,moneyOwned,totalBooksBought);
    res.status(200).json({status:httpStatusText.SUCCESS , data:result.rows});
}

const deleteClient = async function(req:Request , res:Response , next:NextFunction){
    const clientID:number = Number(req.params.clientID);
    const result = await client_queries.deleteClient(clientID);
    res.status(200).json({status: httpStatusText.SUCCESS , data:result.rows});
}

export default {
    getClient,
    getAllClients,
    addClient,
    updateClient,
    deleteClient,
}