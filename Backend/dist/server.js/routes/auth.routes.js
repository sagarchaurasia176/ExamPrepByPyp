"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const GoogleAuth_Controller_1 = require("../controller/GoogleAuth.Controller");
const router = express_1.default.Router();
router.get("/auth/google", GoogleAuth_Controller_1.googleLogin, passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), GoogleAuth_Controller_1.googleCallback);
// / Add a test route to check authentication status
router.get("/auth/status", (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user || null
    });
});
// Apply isAuthenticated middleware to protect the profile route
router.get("/profile", GoogleAuth_Controller_1.isAuthenticated, GoogleAuth_Controller_1.profile);
router.get("/logout", GoogleAuth_Controller_1.logout);
exports.default = router;
