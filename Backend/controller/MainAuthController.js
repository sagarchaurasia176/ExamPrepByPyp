const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Model Authenticaion schema
const Auth = require("../model/AuthSchema");
require("dotenv").config();
const otpGenerator = require("otp-generator");
// otp Schema
const otp = require("../model/OtpSchema");

// otp controllers
exports.OtpGenerate = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }
    const checkDetails = await Auth.findOne({ email: email });
    if (checkDetails) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
      });
    }
    //generate the otp
    let otpVerify = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("your otp" , otpVerify)

    //create the entry into the db
    const createTheEntryIntoDb = await otp.create({email , otp : otpVerify});
    res.status(200).json({
      success: true,
      message: "Otp sent succesfully ",
      otpVerify,
      createTheEntryIntoDb
    });
    //stored into the otp
  } catch (er) {
    return res.status(400).json({
      success: false,
      message: "Failed to generate Otp ",
      error: er.message,
    });
  }
};

// Singup controller
exports.SingupAuthentication = async (req, res) => {
  try {
    const { email, password, role, name, confirmPassword } = req.body;
    // Check for missing fields
    if (!email || !password || !role || !name || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }
    //check the email
    const checkEmailVerifiction = await Auth.findOne({ email });

    if (checkEmailVerifiction) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exist ! Kindly Login ",
      });
    }
    //hash the password
    const hashPawword = await bcrypt.hash(password, 10);

    //otp verification

    //create the entry in the db
    const createTheEntryIntoDb = await Auth.create({
      email,
      password: hashPawword,
      role,
      name,
      confirmPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Singup Succesfully Done !",
      data: createTheEntryIntoDb,
    });
  } catch (er) {
    return res.status(400).json({
      success: false,
      message: "Faild To Singup",
    });
  }
};

// login Authentication
exports.LoginAuthentication = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Check if the email exists
    let checkDataFromDb = await Auth.findOne({ email: email });

    if (!checkDataFromDb) {
      return res.status(400).json({
        success: false,
        message: "You're not singup | Kindly singup first",
      });
    }

    // Check if the password matches
    try {
      const passwordMatch = await bcrypt.compare(
        password,
        checkDataFromDb.password
      );
      console.log("password compare", passwordMatch);

      // Payload for JWT
      const payload = {
        id: checkDataFromDb._id,
        email: checkDataFromDb.email,
      };

      // Options for JWT
      const jwtOptions = {
        expiresIn: "3h",
      };

      // Generate JWT token
      const token = await JWT.sign(payload, process.env.JWT_TOKEN, jwtOptions);
      //after getting the response from the users side we've changed this things
      //otherwise you're details can showing as response when you send the req
      checkDataFromDb = checkDataFromDb.toObject();
      checkDataFromDb.token = token;

      //then you can easily secure the password
      checkDataFromDb.password = undefined;

      // Options for Cookies
      const cookieOptions = {
        expiresIn: 40000, // 1 hour
        httpOnly: true, //for secure and fast send the response !
      };
      // Set the cookie and respond
      res.cookie("Auths", token, cookieOptions).status(200).json({
        success: true,
        checkDataFromDb,
        token,
        message: "Login successful! Welcome to PYP.",
      });
    } catch (er) {
      return res.status(404).json({
        success: false,
        message: "Password Not matched",
        error: er.message,
      });
    }

    //main catch
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "Details not matched",
      error: er.message,
    });
  }
};
