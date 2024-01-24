import { Request,Response,NextFunction } from "express"

import AppError from "../utils/appError";

export default (asyncFunction:any)=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
                asyncFunction(req,res,next).catch((error:AppError)=>{
                    next(error);
                })
    }
}