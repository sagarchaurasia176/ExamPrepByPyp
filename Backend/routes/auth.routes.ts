import express from "express";
import passport from "passport";
import { googleLogin, googleCallback, profile, logout, isAuthenticated } from "../controller/GoogleAuth.Controller";

const router = express.Router();

router.get("/auth/google",
  googleLogin,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

// / Add a test route to check authentication status
router.get("/auth/status", (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null
  });
});

// Apply isAuthenticated middleware to protect the profile route
router.get("/profile", isAuthenticated, profile);
router.get("/logout", logout);

export default router;