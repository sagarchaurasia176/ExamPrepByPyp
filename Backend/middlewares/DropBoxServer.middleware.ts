import { Request, Response, NextFunction } from "express";
import { upload } from "../utils/DropboxWithMulterConfig";
import { error, log } from "console";

export const DropboxMiddleware = (req: any, res: any, next: any): void => {
  try {
    upload.single("file")(req, res, (error: any) => {
      if (error) {
        console.error("Multer error:", error);
        return res.status(400).json({
          message: "File upload failed",
          error: error.message,
        });
      }

      // Check if file was uploaded after multer processing
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a PDF file. via middleware",
        });
      }

      // Optionally validate file type
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          message: "Please upload only PDF files.",
        });
      }

      // Proceed to next middleware/handler
      next();
    });
  } catch (error) {
    console.error("Error in DropboxMiddleware:", error);
  }
};
