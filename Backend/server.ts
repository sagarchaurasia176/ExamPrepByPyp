import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { MonogoDbConnection } from "./config/Dbconfig";
import { PassportConfguration } from './controller/Auth/ConfigAuthWithGooglePassport';
import router from "./routes/auth.routes";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Apply middleware in the correct order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dynamic CORS configuration based on environment

app.use(cors({
  origin: [process.env.FRONTEND_URL ? process.env.FRONTEND_URL : "http://localhost:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session configuration based on environment
app.use(session({
  name: 'pyp-session',
  secret: process.env.SESSION_SECRET || 'zyafafafnafafnalfa',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // Only use 'secure: true' in production with HTTPS
    secure:true,
    // SameSite configuration appropriate for the environment
    sameSite:'none',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
PassportConfguration();

// Debug middleware to log authentication status
app.use((req, res, next) => {
  console.log(`Request path: ${req.path}, origin: ${req.headers.origin}, isAuthenticated: ${req.isAuthenticated()}`);
  next();
});

// Home route
app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1>Authentication Test</h1>
    <p>Server is running successfully</p>
    <a href="/auths/auth/google">Login with Google</a>
  `);
});
// Apply routes
app.use("/auths", router);
// Add a catch-all route for debugging
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
    origin: req.headers.origin
  });
});
// Connect to MongoDB and start server
app.listen(port, async () => {
  try {
    await MonogoDbConnection(process.env.MONGO_DB_URI!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error in connecting to MongoDB", err);
  }
});