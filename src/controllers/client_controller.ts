import {NextFunction, Request,Response} from "express";

import httpStatusText from "../utils/httpStatusText";
import client_queries from "../utils/client_queries";
import Client from "../interfaces/client_interface";

class ClientController{
    constructor(){}

    public async getClient(req:Request , res:Response , next:NextFunction){
        const clientID:number = Number(req.params.clientID);
        const client:Client = await client_queries.getClient(clientID);
        res.status(200).json({status:httpStatusText.SUCCESS , data:{client} });
    }

    public async getAllClients(req:Request , res:Response , next:NextFunction){
        const clients:Client[] = await client_queries.getAllClients();
        res.status(200).json({status:httpStatusText.SUCCESS , data:clients});
    }

    public async addClient(req:Request , res:Response , next:NextFunction){
        const client:Client = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            money_owned: req.body.money_owned
        }
    
        await client_queries.addClient(client);
        res.status(201).json({status: httpStatusText.SUCCESS , data: {message:"Created Successfully"} });
    }

    public async updateClient(req:Request , res:Response , next:NextFunction){
        const clientID:number = Number(req.params.clientID);
        const oldClient:Client = await client_queries.getClient(clientID);
        
        const updatedClient:Client = {
            id: clientID,
            first_name: req.body.first_name || oldClient.first_name,
            last_name: req.body.last_name || oldClient.last_name,
            money_owned: ( typeof req.body.money_owned == "undefined" ? oldClient.money_owned : req.body.money_owned ),
            total_books_bought: ( typeof req.body.total_books_bought == "undefined" ? oldClient.total_books_bought : req.body.total_books_bought ),
        }
    
        const client:Client = await client_queries.updateClient(updatedClient);
        res.status(200).json({status:httpStatusText.SUCCESS , data:{client}});
    }

    public async deleteClient(req:Request , res:Response , next:NextFunction){
        const clientID:number = Number(req.params.clientID);
        await client_queries.deleteClient(clientID);
        res.status(200).json({status: httpStatusText.SUCCESS , data: {message: "Deleted Successfully"} });
    }
}


export default new ClientController();