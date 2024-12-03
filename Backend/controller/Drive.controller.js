const { error } = require("npmlog");
const AuthenticateWithGoogleDrive = require("../config/Drive.config");
const crediential = require("../config/secret.json");
const { google } = require("googleapis");

// Configurations
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

// scopes
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
//List of files from google Drive
const listOfFilesFromGoogleDrive = async (req, res) => {
  try {
    const response = await drive.files.list({
      // pageSize: 1, // Set the desired number of files to retrieve
      fields: "abcPass.png", // Specify the fields to include in the response
    });
    const files = response.data.files;
    console.log("drive response");
    console.log(files);

    res.json(files);
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "Drive contmrooler not work , Data not fetch",
      error: er.message,
    });
  }
};

// Auth controller
const AuthUrlController = async (req, res) => {
  try {
    // code
    const oauthClient = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );
    // Generate the authentication URL
    const authUrl = oauthClient.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: SCOPES,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
    });
    console.log("auth url")
    console.log(authUrl);
  } catch (er) {
    console.error("Error authenticating:", error);
    res.status(500).send("Authentication failed at url.");
  }
};

// AuthCallBacks
const AuthCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Authorization code not provided.");
  }
  try {
    // Exchange the authorization code for access and refresh tokens
    const { tokens } = await oauthClient.getToken(code);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    oauthClient.setCredentials({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
    res.send("Authentication successful!");
  } catch (er) {
    console.error("Error authenticating:", error);
    res.status(500).send("Authentication failed.");
  }
};

module.exports = {
  listOfFilesFromGoogleDrive,
  AuthCallback,
  AuthUrlController
};
