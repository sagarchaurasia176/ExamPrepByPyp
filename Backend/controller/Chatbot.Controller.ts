// ChatBot controller
import { Request, Response } from "express";
import axios from "axios";

export const StudentQueryResolver = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userQuery } = req.body;
    if (!userQuery) {
      res.status(400).json({ error: "User query is required" });
      return;
    }
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    if (!apiKey && !apiUrl) {
      res.status(500).json({ error: "API keyand api url is not configured" });
      return;
    }
 const postData = {
      contents: [
        {
          parts: [
            {
                text: req.body?.userQuery.trim() || "Hi,How can I help you?",
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };


    const responseData = await axios.post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = responseData.data;
    if (response && response.candidates && response.candidates.length > 0) {
      const answer = response.candidates[0].content.parts[0].text;
      res.status(200).json({ answer });
    } else {
      res.status(404).json({ error: "No answer found" });
    }
  } catch (error) {
    console.error("Error in StudentQueryResolver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
