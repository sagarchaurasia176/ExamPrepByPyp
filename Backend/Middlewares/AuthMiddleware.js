const jwtToken = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.Authentication = async (req, res, next) => {
  try {
    //fetch the token from the body
    const tokens = req.body.token || req.cookies.token;
    //verify thr token first
    const verifyTheToken = await jwtToken.verify(tokens, process.env.JWT_TOKEN);
    console.log("token from client side", tokens);
    //just verify that token
    if (!verifyTheToken) {
      return res.json({
        success: false,
        message: "invalid token",
      });
    }
    //convert the token and verify the prev and current token is both have been matched or not
    req.checkDataFromDb = verifyTheToken;
    //middleware that moves to next ()
    //by using the
    next();
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "error at auth middleware",
      error: er.message,
    });
  }
};

//student
exports.StudentAuthentication = async (req, res, next) => {
  try {
    //if not student then send the eroror
    if (req.checkDataFromDb.role !== "Student") {
      return res.status(404).json({
        success: false,
        message: "This is protected route for student",
        error: er.message,
      });
    }
    next()
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "student middleware",
      error: er.message,
    });
  }
};
//admin

exports.AdminAuthentication = async (req, res, next) => {
  try {
    if (req.checkDataFromDb !== "Admin") {
      return res.status(404).json({
        success: false,
        message: "This is protected route for Admin",
        error: er.message,
      });
    }
    next()
    //if not admin then send the eroror
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "Admin middleware ",
      error: er.message,
    });
  }
};