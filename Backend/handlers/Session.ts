import session from "express-session";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

export const passportSession = session({
    name: 'pyp-session',
      secret: process.env.SESSION_SECRET || 'zyafafafnafafnalfa',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // Only use 'secure: true' in production with HTTPS
        secure:false,
        // SameSite configuration appropriate for the environment
        sameSite:'lax', // when it goes to to deployment convert to site
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }});

