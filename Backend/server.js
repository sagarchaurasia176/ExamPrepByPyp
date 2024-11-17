// this side server creation
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT_NO || 8000;
const dbConnection = require("./config/DbConnections");
// routes import here
// const routes = require('');

const cookieParser = require("cookie-parser");

const cors = require('cors');

// cors setup , // middleware

app.use(express.json());
//cookie-parser
app.use(cookieParser());
//listen port
app.listen(port, () => {
  console.log(` "server running at" ${port}`);
});

// Db connection apply here so we get !
dbConnection();
// routes apply here so we get like
// app.use("/pyp", routes);

//send the request to the backend
app.get("/", (req, res) => {
  res.send("Pyp backend is in working mode!");
});
