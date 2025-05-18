"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportConfguration = void 0;
// Passport configuration for Google OAuth
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_Schema_1 = require("../../schema/Auth.Schema"); // Adjust path as needed
dotenv_1.default.config();
const PassportConfguration = () => {
    // Serialize user info to store in session
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    // Deserialize user from session
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield Auth_Schema_1.UserModel.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error, null);
        }
    }));
    //yooo
    // Configure Google Strategy
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURL,
        // Make sure this matches the route in your auth.routes.ts
        // The full URL will be: http://yourbackend.com/auths/auth/google/callback
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        try {
            // Check if user already exists
            let user = yield Auth_Schema_1.UserModel.findOne({ googleId: profile.id });
            if (!user) {
                // Create new user if doesn't exist
                user = yield Auth_Schema_1.UserModel.create({
                    googleId: profile.id,
                    email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value,
                    displayName: profile.displayName,
                    firstName: (_c = profile.name) === null || _c === void 0 ? void 0 : _c.givenName,
                    lastName: (_d = profile.name) === null || _d === void 0 ? void 0 : _d.familyName,
                    avatar: (_f = (_e = profile.photos) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value,
                });
            }
            return done(null, user);
        }
        catch (error) {
            return done(error, undefined);
        }
    })));
};
exports.PassportConfguration = PassportConfguration;
