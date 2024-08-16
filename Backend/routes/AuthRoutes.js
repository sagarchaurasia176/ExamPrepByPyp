const express = require("express");
const {
  SingupAuthentication,
  LoginAuthentication,
  OtpGenerate,
} = require("../controller/MainAuthController");
const {
  Authentication,
  StudentAuthentication,
  AdminAuthentication,
} = require("../Middlewares/AuthMiddleware");

// Routes
const routes = express.Router();

// Login - singup Routes
routes.post("/Singup", SingupAuthentication);
routes.post("/login", LoginAuthentication);
routes.post('/otp/verify' , OtpGenerate);


// this is middleware for secure purpose
routes.get("/pyp/auth/test", Authentication, (req, res) => {
  res.send("This is protected route only for Test");
});

routes.get(
  "/pyp/auth/student",
  Authentication,
  StudentAuthentication,
  (req, res) => {
    res.send("This is protected route only for Student");
  }
);

routes.get(
  "/pyp/auth/admin",
  Authentication,
  AdminAuthentication,
  (req, res) => {
    res.send("This is protected route only for admin");
  }
);

// exports the routes,
module.exports = routes;
