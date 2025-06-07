// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import router from "./routes/auth.routes";
import cookieParser from 'cookie-parser';
import { PassportConfguration } from "./config/ConfigAuthWithGooglePassport";
import { ListenPort } from "./handlers/ListenPort";
import { passportSession } from "./handlers/Session";
import { MiddlewareDebugger } from "./handlers/DebugMiddleware";
import { HomeRoute } from "./handlers/HomeRoute";
import { CorsHandler } from "./handlers/CorsHandler";
import { paper } from "./routes/Paper.routes";
import { botRouter } from "./routes/bot.routes";
import { DropboxMiddlewareConfigErrorHandler } from "./errors/DropboxMiddleware";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
// Apply middleware in the correct order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Dynamic CORS configuration based on environment
CorsHandler(app);
// Session configuration based on environment
app.use(passportSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(DropboxMiddlewareConfigErrorHandler);
// Configure passport
PassportConfguration();

// Apply routes
app.use("/auths", router);
app.use("/all/paper",paper);
app.use('/bot',botRouter);

// Debugging route
HomeRoute(app);
// Debugging route
MiddlewareDebugger(app);
// Listen to the port
ListenPort(app, PORT as string);



