const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { message } = require("statuses");
const { error } = require("console");
const { response } = require("express");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const CREDENTIALS_PATH = path.join(process.cwd(), "secre.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function loadSavedCredentialsIfExist(req, res) {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    res.json({
      message: "save credientials if exist ",
      data: credentials,
    });
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}
async function saveCredentials(client , res) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  console.log("key");
  console.log(keys);
  const key = keys.installed || keys.web;
  try {
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
    });
    await fs.writeFile(TOKEN_PATH, payload);
    return res.json({
      message: "true",
      data: payload,
    });
  } catch (er) {
    console.log(er);
  }
}
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  try {
    if (client) {
      console.log("authorized client")
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
      console.log("client credietinals done")
    }

    return client;
  } catch (er) {
    console.log(er);
  }
}

async function listFiles(oauth2 , res) {
  const drive = google.drive({ version: "v3", auth: oauth2 });
  console.log("gogogle drive resp");
  console.log(drive);

  try {
    const response = await drive.files.list({
      pageSize: 1, // Set the desired number of files to retrieve
      fields: "files(name, id)", // Specify the fields to include in the response
    });
    const files = response.data.files;
    console.log("files of the data");
    console.log(files);

    // const files = res.data.files;
    if (files.length === 0) {
      console.log("No files found.");
      return;
    }
    console.log("Files:");
   let FileFilteredData =  files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });

    res.json({
      message:"true",
      data:FileFilteredData
    })

  } catch (err) {
    console.error("Error listing files:", err);
  }
}

module.exports = {
  listFiles,
  authorize,
  saveCredentials,
  loadSavedCredentialsIfExist,
};
