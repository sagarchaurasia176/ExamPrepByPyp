// lets create the schema here so we get
const mongoose = require("mongoose");
// mongoose schema apply here so we get
const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type:String,
  },
  role: {
    type: String,
    enum: ["Admin", "Student"],
  },
  name: {
    type: String,
  },
});

// exports the model here so we get
module.exports = mongoose.model("Auth", AuthSchema);
