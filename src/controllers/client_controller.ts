import {NextFunction, Request,Response} from "express";

import httpStatusText from "../utils/httpStatusText";
import clientModel from "../models/client_model";
import Client from "../interfaces/client_interface";
import asyncWrapper from "../middlewares/asyncWrapper";
import AppError from "../utils/appError";

class ClientController{
    constructor(){}

    public getClient = asyncWrapper(
        async (req:Request , res:Response , next:NextFunction)=>{
            const clientID:number = Number(req.params.clientID);
            const client = await clientModel.findOne({ where:{id: clientID} });
            if(!client){
                const error = new AppError(httpStatusText.FAIL , 400, "This client doesn't exist");
                return next(error);
            }
            return res.status(200).json({status:httpStatusText.SUCCESS , data:{client} });
        }
    )

    public getAllClients = asyncWrapper(
        async (req:Request , res:Response , next:NextFunction)=>{
            const clients = await clientModel.findAll();
            return res.status(200).json({status:httpStatusText.SUCCESS , data:clients});
        }
    )

    public addClient = asyncWrapper(
        async (req:Request , res:Response , next:NextFunction)=>{    
            const client:Client = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                money_owned: req.body.money_owned
            }
        
            await clientModel.create(client as any);
            return res.status(201).json({status: httpStatusText.SUCCESS , data: {message:"Created Successfully"} });
        }
    )

    public updateClient = asyncWrapper(
        async (req:Request , res:Response , next:NextFunction)=>{
            const clientID:number = Number(req.params.clientID);
            const oldClient = await clientModel.findOne({ where:{id: clientID} });
            
            if(!oldClient){
                const error = new AppError(httpStatusText.FAIL , 400, "This client doesn't exist");
                return next(error);
            }
        
            const client = (await clientModel.update({...req.body} , {where: {id:clientID}, returning:true}))[1];
            return res.status(200).json({status:httpStatusText.SUCCESS , data:{client}});
        }
    )

    public deleteClient = asyncWrapper(
        async (req:Request , res:Response , next:NextFunction)=>{
            const clientID:number = Number(req.params.clientID);
            await clientModel.destroy({where: {id:clientID}});
            return res.status(200).json({status: httpStatusText.SUCCESS , data: {message: "Deleted Successfully"} });
        }
    )
}


export default new ClientController();