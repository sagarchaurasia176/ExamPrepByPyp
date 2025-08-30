import multer from "multer";

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
