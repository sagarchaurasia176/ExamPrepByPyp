const express = require("express");
const {
  loadSavedCredentialsIfExist,
  saveCredentials,
  authorize,
  listFiles,
} = require("../controller/Drive.controller");
const router = express.Router();

router.post("/loadCred", loadSavedCredentialsIfExist);
router.post("/save", saveCredentials);
router.post("/authorize", authorize);
router.get("/list", listFiles);

module.exports = router;
