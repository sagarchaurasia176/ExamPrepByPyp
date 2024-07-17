const Login = require("../model/Login");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { use } = require("../routes/LoginRoutes");

// Controller of login page
exports.UseLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    // Check if the email exists
    let user = await Login.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not registered, please Register first!",
      });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Payload for JWT
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Options for JWT
    const jwtOptions = {
      expiresIn: "3h",
    };

    // Generate JWT token
    const jwt_token = JWT.sign(payload, process.env.JWT_SECRET, jwtOptions);
    user.jwt_token = jwt_token;
    user = user.toObject();
    user.password = undefined;

    // Options for Cookies
    const cookieOptions = {
      expires: new Date(Date.now() + 3600000), // 1 hour
      httpOnly: true,
    };

    // Set the cookie and respond
    res
      .cookie("login", jwt_token, cookieOptions)
      .status(200)
      .json({
        success: true,
        user: {
          email: user.email,
          id: user._id,
          user: user.role,
        },
        jwt_token,
        message: "Login successful! Welcome to PYP.",
      });
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during login.",
      error: er.message,
    });
  }
};
