const mongoose = require("mongoose");
// function for flag purspose and also for dotev file
require("dotenv").config();

const MongooseDbConnection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      // flage apply here so we get
      useNewUrlParser: true,
      useUniFiedTopology: true,
    })
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((er) => {
      console.log("error in the db connection", er);
      console.log("check")
    });
};
//  export the module here so we get

module.exports = MongooseDbConnection;
