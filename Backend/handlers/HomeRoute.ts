import { Request, Response, Router } from "express";
import express from 'express';

export const HomeRoute = (app: express.Express): void => {
    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
        message: "Welcome to the Pyp Backend API",
        status: "success",
        });
    });
    }



