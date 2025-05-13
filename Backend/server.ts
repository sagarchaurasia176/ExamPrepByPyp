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

// Use cookie-parser middleware to parse cookies
app.use(cookieParser()); 

// Apply CORS middleware properly
app.use(cors({
      origin: ["https://pyp.dev-saga.in" , "http://localhost:5173" ], // Replace with your frontend URL
      credentials: true, // Required for cookies/sessions
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session middleware must come BEFORE passport
// Initialize session middleware 
// Use express-session for session management

app.use(session({
  name: 'connect.sid',
  secret: 'zyafafafnafafnalfa',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true, // true if you're using HTTPS
    sameSite: 'lax', // or 'none' with secure: true
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Initialize passport after session
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
PassportConfguration();

// Debug middleware to log authentication status
app.use((req, res, next) => {
  console.log(`Request path: ${req.path}, isAuthenticated: ${req.isAuthenticated()}`);
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

// Apply routes - note the /auths prefix
app.use("/auths", router);

// Add a catch-all route for debugging
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method
  });
});

// Connect to MongoDB and start server
app.listen(port, async () => {
  try {
    console.log(`Server is listening on port ${port}`);
    await MonogoDbConnection(process.env.MONGO_DB_URI!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error in connecting to MongoDB", err);
  }  
});