import {Request,Response,NextFunction} from 'express';
import { error } from 'console';
import multer from 'multer';


// Import the multer configuration for file upload
export const DropboxMiddlewareConfigErrorHandler=(error:any,req:Request,res:Response,next:NextFunction):void=>{
    try{
        if(error instanceof multer.MulterError){
            if(error.code === 'LIMIT_FILE_SIZE'){
                res.status(400).json({ message: "File size exceeds the limit of 10MB." });
                return;
                }
        }
        if(error.message === 'Only PDF files are allowed.'){
            res.status(400).json({ message: "Only PDF files are allowed." });
            return;
        }
        res.status(500).json({ message: "Internal error in DropboxMiddleware" });
    }catch(err){
        console.error("Error in DropboxMiddlewareConfigErrorHandler:", err);
        res.status(500).json({ message: "Internal error in DropboxMiddleware" });
    }
}





