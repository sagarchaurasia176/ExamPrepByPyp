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
const isProduction = process.env.NODE_ENV === 'production';

// Apply middleware in the correct order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// Dynamic CORS configuration based on environment
const allowedOrigins = isProduction 
  ? [process.env.FRONTEND_URL || 'https://pyp.dev-saga.in'] 
  : ['http://localhost:3000', 'http://localhost:5173'];

console.log('Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !isProduction) {
      callback(null, true);
    } else {
      console.log('CORS blocked request from:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
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
    secure: isProduction,
    // SameSite configuration appropriate for the environment
    sameSite: isProduction ? 'none' : 'lax',
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
    <p>Environment: ${isProduction ? 'Production' : 'Development'}</p>
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
    console.log(`Server is listening on port ${port} in ${isProduction ? 'production' : 'development'} mode`);
    await MonogoDbConnection(process.env.MONGO_DB_URI!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error in connecting to MongoDB", err);
  }  
});