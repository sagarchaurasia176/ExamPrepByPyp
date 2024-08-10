// this side server creation
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT_NO || 8000;
const dbConnection = require("./config/DbConnections");
dbConnection();
// routes import here
const routes = require("./routes/LoginRoutes");
// cors setup , // middleware
app.use(express.json());
app.listen(port, () => {
  console.log(` "sernver running at" ${port}`);
});

app.get("/", (req, res) => {
  res.send("Pyp backend is in working mode!");
});

// routes apply here so we get like
app.use("/pyp/login", routes);
