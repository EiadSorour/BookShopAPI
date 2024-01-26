import express,{Request,Response,NextFunction} from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import clientRouter from "./routes/client_router";
import bookRouter from "./routes/book_router";
import transactionRouter from "./routes/transaction_router";
import sequelize from "./models/sequelize";
import httpStatusText from "./utils/httpStatusText";
import AppError from "./utils/appError";

const app:express.Application = express();
const port:number|string = process.env.PORT || 5000;

sequelize.authenticate().then(()=>{
    console.log("Connected to BookShop database successfully");
}).catch((error)=>{
    console.log(error);
});
sequelize.sync().then(()=>{
    console.log("All models are created");
})

app.use(express.json())
app.use(cors());

app.use("/api/client" , clientRouter);
app.use("/api/book" , bookRouter);
app.use("/api/buy" , transactionRouter);

app.use((error:AppError, req:Request, res:Response, next:NextFunction)=>{
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR , message:error.message});
});
app.use("*" , (req:Request, res:Response, next:NextFunction)=>{
    res.status(404).json({status: httpStatusText.ERROR , message:"This resource is not available"});
})

app.listen(port , ():void=>{
    console.log(`Server is listening on port ${port}`);
});
