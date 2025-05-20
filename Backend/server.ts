// Import necessary modules
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { MonogoDbConnection } from "./config/Dbconfig";
import router from "./routes/auth.routes";
import cookieParser from 'cookie-parser';
import { log } from "console";
import { PassportConfguration } from "./config/ConfigAuthWithGooglePassport";
import { RouteDebugger } from "./handlers/RouteHandler";
import { ListenPort } from "./handlers/ListenPort";
import { passportSession } from "./handlers/Session";
import { MiddlewareDebugger } from "./handlers/DebugMiddleware";
import { HomeRoute } from "./handlers/HomeRoute";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
// Apply middleware in the correct order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Dynamic CORS configuration based on environment
cors(app as any);
// Session configuration based on environment
app.use(passportSession);
app.use(passport.initialize());
app.use(passport.session());
// Configure passport
PassportConfguration();
// Apply routes
app.use("/auths", router);
HomeRoute(app);
// Debugging route
MiddlewareDebugger(app);
// Listen to the port
ListenPort(app, PORT as string);

