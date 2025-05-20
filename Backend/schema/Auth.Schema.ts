// User Model for MongoDB
import mongoose, { Schema, Document } from "mongoose";
// Define the User interface extending mongoose Document
// This interface represents the structure of the User document in MongoDB
// It includes properties like googleId, email, displayName, etc.
export interface IUser extends Document {
  googleId: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  googleId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  displayName: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String 
  },
  lastName: { 
    type: String 
  },
  avatar: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);