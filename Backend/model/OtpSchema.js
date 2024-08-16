const mongoose = require("mongoose");
const MailConfig = require("../config/MailConfig");

const otpShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
    expire: 5 * 60,
  },
});

// send email to the server
async function sendMailToTheGmail(email, otp) {
  try {
    const mailResponse = await MailConfig(email, "Welcome", otp);
    console.log("mail transport", mailResponse);
  } catch (er) {
    console.log("error in otp schema", otpShema);
  }
}
//pre middleware used to send the otp to the gmail !
otpShema.pre("save", async function otpSender(next) {
  await sendMailToTheGmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("otp", otpShema);
