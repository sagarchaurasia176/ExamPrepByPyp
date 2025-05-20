import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();


export const CorsHandler = async(app:express.Express):Promise<void>=>{
  app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
}


