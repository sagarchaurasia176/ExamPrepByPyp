const express = require("express");
const routes = express.Router();

// this is middleware for secure purpose
const{auth , isStudent , isAdmin} = require('../Middlewares/MainAuth')
const { UseLogin } = require("../controller/UseLogin");
// sending the server requrest , so we get like
routes.post("/UseLogin", UseLogin);
// main protected routes for middleware so












// exports the routes,
module.exports = routes;
