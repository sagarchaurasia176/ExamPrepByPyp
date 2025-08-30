import { Request, Response } from "express";
import { DropboxConfig } from "../config/Dropbox.config";
import { PaperModel } from "../schema/Paper.Schema";

export const uploadPaper = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, sem, branch, subject } = req.body;
    const file = req.file; //folder request by the user

    // Step 1: Validate all inputs
    if (!title || !sem || !branch || !subject || !file) {
      return res.status(400).json({
        message: "Please provide title, sem, branch, subject and upload a PDF file.",
      });
    }
    // Step 2: Upload to Dropbox
    const dropboxResponse = await DropboxConfig.filesUpload({
      path: `/pyppapers/${Date.now()}-${file.originalname}`,
      contents: file.buffer,
      autorename: true,
    });
    // Step 3: Create shared link
      const sharedLink = await DropboxConfig.sharingCreateSharedLinkWithSettings({
      path: dropboxResponse.result.path_display || "",
    });
    const rawUrl = sharedLink.result.url;
    const urlObj = new URL(rawUrl);
    urlObj.searchParams.set("dl", "1"); // modify the link to direct download

    const fileUrl = urlObj.toString(); // Direct download link
    if (!fileUrl) {
      return res.status(500).json({ message: "Failed to create shared link for the file." });
    }
    // Step 4: Normalize branch
    const normalizedBranch = branch.toUpperCase();
    // Step 5: Save to DB
    const savedPaper = await PaperModel.create({
      title,
      sem,
      branch: normalizedBranch,
      subject,
      fileurl: fileUrl,
    });
    res.status(201).json({
      message: "Paper uploaded successfully",
      paper: savedPaper,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
