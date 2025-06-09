import {Dropbox} from 'dropbox';
// Importing the Dropbox SDK
export const DropboxConfig = new Dropbox({
    accessToken: process.env.DBOX_ACCESS_TOKEN,
    clientId: process.env.DBOX_API_KEY,
    clientSecret: process.env.DBOX_API_SECRET,
    redirect_uri: "http://localhost:5000", // must match exactly what you used during /authorize
    fetch:fetch // provide fetch for server-side usage
})







