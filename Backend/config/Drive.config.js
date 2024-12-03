const { google } = require("googleapis");
const { fs } = require("fs");
const path = require("path");

//AuthenticateWithGoogle
const AuthenticateWithGoogleDrive = async () => {
  const auth = new google.auth.OAuth2({
    keyFile:"secret.json",
    scopes: "https://www.googleapis.com/auth/drive",
  });
  console.log("auth config work fine");

  return google.drive({ version: "v3", auth });
};
module.exports = AuthenticateWithGoogleDrive;
