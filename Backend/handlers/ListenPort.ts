import express from 'express';
import { Request, Response } from 'express';
import { MonogoDbConnection } from '../config/Dbconfig';
import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

export const ListenPort = async(app:express.Express , port:string):Promise<void> => {
    try {
        await MonogoDbConnection(process.env.MONGO_URI as string);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`MongoDB connection established successfully`);    
        });
    }catch (error) {    
        console.error('Error starting the server:', error);
    }
}

