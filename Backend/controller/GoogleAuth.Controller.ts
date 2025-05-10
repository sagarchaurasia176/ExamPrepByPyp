import { NextFunction, Request, Response } from "express";

// Middleware to check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

export const googleLogin = (req: Request, res: Response, next: NextFunction) => {
  // triggers Google login flow
  next();
};

export const googleCallback = (req: Request, res: Response) => {
  // callback after Google auth success
  res.redirect("/profile");
};

export const profile = (req: Request, res: Response) => {
  // By the time this handler runs, we've already checked authentication
  // via the isAuthenticated middleware, so req.user should be defined
  res.json({
    message: "You are logged in!",
    user: req.user
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};