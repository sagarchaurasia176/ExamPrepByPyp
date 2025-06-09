import { Dropbox } from 'dropbox';
import { Request, Response } from 'express';   
import { DropboxConfig } from '../config/Dropbox.config';
import axios from 'axios';

export const DropboxAccessTokenHandler = async (req: Request, res: Response): Promise<void> => {  
    try{
        const code = req.query.code as string;
        if (!code) {
            res.status(400).json({ message: "Authorization code is required." });
            return;
        }
        // Exchange the authorization code for an access token
        const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
            params: {
                code: code,
                grant_type: 'authorization_code',
                client_id: process.env.DBOX_API_KEY,
                client_secret: process.env.DBOX_API_SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
            const { access_token, refresh_token, expires_in } = response.data;
            console.log("Access Token:", access_token);
            console.log("Refresh Token:", refresh_token);

            res.status(200).json({
                message: "Access token retrieved successfully.",
                access_token: access_token,
                refresh_token: refresh_token,    
                expires_in: expires_in,
            })    
            

    }catch (error) {
        console.error("Error in DropboxAccessTokenHandler:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}



