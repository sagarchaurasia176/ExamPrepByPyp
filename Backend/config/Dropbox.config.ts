import {Dropbox} from 'dropbox';
// Importing the Dropbox SDK
export const DropboxConfig = new Dropbox({
    accessToken: process.env.DBOX_ACCESS_TOKEN,
    fetch:fetch // provide fetch for server-side usage
})







