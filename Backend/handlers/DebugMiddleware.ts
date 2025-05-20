import express from 'express';
import { Request, Response } from 'express';
export const MiddlewareDebugger= async(app:express.Express):Promise<void>=>{
    app.use((req: Request, res: Response, next) => {
        console.log(`Request path: ${req.path}, origin: ${req.headers.origin}, isAuthenticated: ${req.isAuthenticated()}`);
        next();
      });
};




