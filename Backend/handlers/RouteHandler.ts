import { Request, Response, Router } from "express";
import express from 'express';


export const RouteDebugger = {
    use:(callback: (req: Request, res: Response) => void) => {
    const router = Router();
    router.use((req, res, next) => {
      callback(req, res);
      next();
    });
    return router;
  }
};






