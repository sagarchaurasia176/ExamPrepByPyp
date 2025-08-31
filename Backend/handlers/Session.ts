import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

export const passportSession = session({
  name: "pyp-session",
  secret: process.env.SESSION_SECRET || "fallback_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure:true,
    sameSite:"none",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
