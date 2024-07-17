// lets create the schema here so we get
const mongoose = require("mongoose");
// mongoose schema apply here so we get
const Login = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: ['student' , 'admin']

});

// exports the model here so we get
module.exports = mongoose.model("Login", Login);
