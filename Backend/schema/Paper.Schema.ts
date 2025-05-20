import mongoose from "mongoose";
import { Document } from "mongoose";

interface Paper extends Document {
  title: string;
}
//paper schema for different paper types with the dropbox url to fetch the paper

