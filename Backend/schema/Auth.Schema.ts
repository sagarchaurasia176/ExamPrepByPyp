import mongoose, { Schema, Document } from "mongoose";

// Interface for Google Authentication User
export interface IGoogleUser extends Document {
  GoogelId: string;
  DisplayName: string;
  Email: string;
  Photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Google Authentication with Passport
const GoogleAuthSchema = new Schema(
  {
    GoogelId: {
      type: String,
      required: true,
      unique: true,
    },
    DisplayName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Photo: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model for Google Authentication with Passport
export const GoogleAuthenticationWithPassport = mongoose.model<IGoogleUser>(
  "GoogleAuth",
  GoogleAuthSchema
);