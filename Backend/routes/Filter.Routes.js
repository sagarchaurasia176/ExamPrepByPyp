const express = require("express");
const router = express.Router();
const {
  listOfFilesFromGoogleDrive,
  AuthCallback,
  AuthUrlController,
} = require("../controller/Drive.controller");

//List files from googel drive !
router.get("/api/v1/paper", listOfFilesFromGoogleDrive);
// Get the authentication URL
router.get("/api/drive/Auth", AuthCallback);
//Auth url check
// router.get("/api/auth/url/check", AuthUrlController);
router.get("/api/auth/url/check", AuthUrlController, (req, res) => {
  res.send(AuthUrlController);
});

module.exports = router;
