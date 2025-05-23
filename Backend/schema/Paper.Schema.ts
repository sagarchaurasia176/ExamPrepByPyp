import mongoose from "mongoose";
import { Document } from "mongoose";

interface Paper extends Document {
  title: string,
  sem:String,
  branch:String,
  subject: string;
  fileurl: string;
}

//paper schema for different paper types with the dropbox url to fetch the paper
const PaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  fileurl: {
    type: String,
    required: true,
  },
});
// Exporting the Paper model
export const PaperModel = mongoose.model<Paper>("Paper", PaperSchema);





