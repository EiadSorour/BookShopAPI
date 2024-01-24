import httpStatusText from "./httpStatusText";

class AppError extends Error{
    constructor(public statusText?:httpStatusText, public statusCode?:number, message:string = "Error something went wrong"){
        super();
        this.message = message;
    }
}

export default AppError;