import multer from "multer";
import fs from "fs";
import path from "path";

// Configure multer for file upload to disk storage
// This configuration will save uploaded files to the "./pyppapers/" directory

// export const multerFild = multer({
//   storage: "pyppapers", // store files in memory, not on disk
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== "application/pdf") {
//       const error = new Error("Only PDF files are allowed!");
//       return cb(error as any, false);
//     }
//     cb(null, true);
//   }
// });


// });
export const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      // Reject the file AND return custom error
    const error = new Error("Only PDF files are allowed!");
    return cb(error as any, false);  }
    cb(null, true); // Accept the file
  }
});
