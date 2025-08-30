import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

//intailize the Google authentication
export const googleLogin = (req: Request, res: Response , next:NextFunction) => {
  // This function is intentionally left empty
  next();
};  
// Callback function for Google authentication
export const googleCallback = (req: Request, res: Response) => {
  const frontendUrl=process.env.FRONTEND_URL! as string;// problem resolved 
  res.redirect(`${frontendUrl}/auth/success`);
}
//get the user profile
export const profile = (req: Request, res: Response) => {
  console.log("User profile accessed");
  res.json({
    success:true,
    user:req.user,
  });
};
//logout the user
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
};
// Middleware to check if user is authenticated 
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: "Unauthorized  " });
};