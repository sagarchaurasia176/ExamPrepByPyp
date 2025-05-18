"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const Dbconfig_1 = require("./config/Dbconfig");
const ConfigAuthWithGooglePassport_1 = require("./controller/Auth/ConfigAuthWithGooglePassport");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
// Apply middleware in the correct order
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Dynamic CORS configuration based on environment
const allowedOrigins = isProduction
    ? [process.env.FRONTEND_URL || 'https://pyp.dev-saga.in']
    : ['http://localhost:3000', 'http://localhost:5173'];
console.log('Allowed CORS origins:', allowedOrigins);
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || !isProduction) {
            callback(null, true);
        }
        else {
            console.log('CORS blocked request from:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Session configuration based on environment
app.use((0, express_session_1.default)({
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
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configure passport
(0, ConfigAuthWithGooglePassport_1.PassportConfguration)();
// Debug middleware to log authentication status
app.use((req, res, next) => {
    console.log(`Request path: ${req.path}, origin: ${req.headers.origin}, isAuthenticated: ${req.isAuthenticated()}`);
    next();
});
// Home route
app.get("/", (req, res) => {
    res.send(`
    <h1>Authentication Test</h1>
    <p>Server is running successfully</p>
    <p>Environment: ${isProduction ? 'Production' : 'Development'}</p>
    <a href="/auths/auth/google">Login with Google</a>
  `);
});
// Apply routes
app.use("/auths", auth_routes_1.default);
// Add a catch-all route for debugging
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        path: req.path,
        method: req.method,
        origin: req.headers.origin
    });
});
// Connect to MongoDB and start server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Server is listening on port ${port} in ${isProduction ? 'production' : 'development'} mode`);
        yield (0, Dbconfig_1.MonogoDbConnection)(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.log("Error in connecting to MongoDB", err);
    }
}));
