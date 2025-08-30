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
    secure: process.env.NODE_ENV === "production", // only secure in prod
    sameSite: "none", // required for cross-site cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
