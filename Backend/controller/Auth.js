//Auths schema creations here
const bcrypt = require("bcrypt");
const Auths = require("../model/AuthSchema");
const jwtToken = require("jsonwebtoken");
const { error } = require("npmlog");
require("dotenv").config();
//singup auth
exports.SingupAuthentication = async (req, res) => {
  try {
    //email , password , role fetch
    const { email, password, role } = req.body;
    //validaion
    if (!email || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "filed the details !",
      });
    }
    //email validaions
    const AuthsValid = Auths.findOne({ email });
    if (AuthsValid) {
      return res.status(404).json({
        success: false,
        message: "email already stored ! kindly login it",
      });
    }
    //hash the password
    try {
      const hashThePassword = await bcrypt.hash(password, 10);
      if (!hashThePassword) {
        return res.status(404).json({
          success: false,
          message: "password not hash ! kidnly talk to admin",
        });
      }
    } catch (er) {
      return res.status(404).json({
        success: false,
        message: "error in hashing the password !",
        error: er.message,
      });
    }
    //stroed the data into db
    const dataCreateInDb = await Auths.create({ email, password, role });
    return res.status(200).json({
      success: true,
      message: "Singup succefully done ! kindly login it ",
      data: dataCreateInDb,
    });
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "Singup not done Kindly checked it!",
      error: er.message,
    });
  }
};

//lgin authentication apply here !
exports.LoginAuthentication = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //valid
    //validaion
    if (!email || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "filed the details !",
      });
    }
    //email validaions
    const checkValidationIntoInDb = await Auths.findOne({ email });
    if (checkValidationIntoInDb) {
      return res.status(404).json({
        success: false,
        message: "email already stored ! kindly login it",
      });
    }
    //password compare
    try {
      const passwordCompared = await bcrypt.compare(
        LoginValid.password,
        password
      );
      if (!passwordCompared) {
        return res.status(404).json({
          success: false,
          message: "wrong password",
        });
      }
      //create jwt  as well as cookies
      const payload = {
        id: LoginValid._id,
        email: LoginValid.email,
      };
      // jwt 
      const jwt = await jwtToken.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: "1h",
      });
      //not jwt
      if (!jwt) {
        return res.status(404).json({
          success: false,
          message: "jwt token is empty !",
        });
      }
      //conversion of the token
      checkValidationIntoInDb = checkValidationIntoInDb.toObject();
      checkValidationIntoInDb.jwt = jwt;
      checkValidationIntoInDb.password = undefined;
      // cookies apply there
      const option = {
        expiresIn: Date.now(),
      };
      //added the cookies
      res.cookies("auths", jwt, option);
      //send the request to the server
      return res.status(200).json({
        success: true,
        jwt,
        checkValidationIntoInDb,
        message: "Login Succesfully Done !",
      });
    } catch (er) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password ",
        error: er.message,
      });
    }

    // catch apply here so we get!
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "Login not Succesfully Done !",
      error: er.message,
    });
  }
};
