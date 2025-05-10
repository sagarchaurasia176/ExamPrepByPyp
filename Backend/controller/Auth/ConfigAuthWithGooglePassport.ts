import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GoogleAuthenticationWithPassport } from "../../schema/Auth.Schema";
import { Document } from "mongoose";

// Define interface for our user type to match Passport's expectations
interface UserDocument extends Document {
  _id: string;
  GoogelId: string;
  DisplayName: string;
  Email: string;
  Photo?: string;
}

// Extend the Express Request type to include our user
declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}

export const PassportConfguration = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:5000/auths/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user
          let user = await GoogleAuthenticationWithPassport.findOne({
            GoogelId: profile.id,
          });

          // Check if user already exists in the database
          if (!user) {
            user = await GoogleAuthenticationWithPassport.create({
              GoogelId: profile.id,
              DisplayName: profile.displayName,
              Email: profile.emails?.[0]?.value || "",
              Photo: profile.photos?.[0]?.value,
            });
          }
          
          // Cast the user document to our UserDocument type
          return done(null, user as UserDocument);
        } catch (err) {
          console.error("Error in Google authentication", err);
          return done(err as Error, undefined);
        }
      }
    )
  );

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await GoogleAuthenticationWithPassport.findById(id);
      done(null, user as UserDocument);
    } catch (err) {
      console.error("Error in deserializing user", err);
      done(err as Error, null);
    }
  });
};