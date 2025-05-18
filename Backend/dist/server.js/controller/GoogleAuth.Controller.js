"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.logout = exports.profile = exports.googleCallback = exports.googleLogin = void 0;
//intailize the Google authentication
const googleLogin = (req, res, next) => {
    // This function is intentionally left empty
    console.log("Google login initiated");
    next();
};
exports.googleLogin = googleLogin;
// Callback function for Google authentication
const googleCallback = (req, res) => {
    console.log("Google authentication callback");
    const frontendUrl = process.env.FRONTEND_URL == "production" ? "http://localhost:5173" : "https://pyp.dev-saga.in"; // problem resolved 
    res.redirect(`${frontendUrl}/auth/success`);
};
exports.googleCallback = googleCallback;
//get the user profile
const profile = (req, res) => {
    console.log("User profile accessed");
    res.json({
        success: true,
        user: req.user,
    });
};
exports.profile = profile;
//logout the user
const logout = (req, res) => {
    console.log("User logged out");
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.json({ success: true, message: "Logged out successfully" });
    });
};
exports.logout = logout;
// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ success: false, message: "Unauthorized" });
};
exports.isAuthenticated = isAuthenticated;
