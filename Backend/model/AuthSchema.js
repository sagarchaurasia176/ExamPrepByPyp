// lets create the schema here so we get
const mongoose = require("mongoose");
// mongoose schema apply here so we get
const Auth = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student", "Admin"],
  },
});

// exports the model here so we get
module.exports = mongoose.model("Auths", Auth);
