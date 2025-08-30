// Passport configuration for Google OAuth
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { UserModel } from "../schema/Auth.Schema"; // Adjust path as needed
dotenv.config();
// Initialize Google authentication 
export const PassportConfguration = () => {
  // Serialize user info to store in session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  // Configure Google Strategy for Passport
  // This strategy is used to authenticate users using Google OAuth 2.0
  passport.use(
    new GoogleStrategy(
      {
        clientID:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL:process.env.GOOGLE_CALLBACK_URL as string,
      },
      // Callback function to handle the response from Goog
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await UserModel.findOne({ googleId: profile.id });
          
          if (!user) {
            // Create new user if doesn't exist
            user = await UserModel.create({
              googleId: profile.id,
              email: profile.emails?.[0]?.value,
              displayName: profile.displayName,
              firstName: profile.name?.givenName,
              lastName: profile.name?.familyName,
              avatar: profile.photos?.[0]?.value,
            });
          }
          
          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );
};