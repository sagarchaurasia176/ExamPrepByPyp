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
      res.status(400).json({ success: false, error: "User query is required" });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    if (!apiKey || !apiUrl) {
      res
        .status(500)
        .json({ success: false, error: "API key and API URL not configured" });
      return;
    }

    // Enhanced prompt for better chat responses
    const enhancedQuery = `
      You're a smart, friendly assistant helping students master their exams with confidence. 
      Give a short (under 50 words), clear, and motivating answer using simple language. 
      Question: ${userQuery.trim()}
      `;

    const postData = {
      contents: [
        {
          parts: [
            {
              text: enhancedQuery,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300, // Reduced for shorter responses
      },
    };

    const responseData = await axios.post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = responseData.data;
    if (response && response.candidates && response.candidates.length > 0) {
      let answer = response.candidates[0].content.parts[0].text;

      // Clean up the response formatting
      answer = answer
        .replace(/\*\*\*/g, "") // Remove triple asterisks
        .replace(/\*\*/g, "") // Remove double asterisks (bold)
        .replace(/\*/g, "") // Remove single asterisks
        .replace(/#{1,6}\s*/g, "") // Remove markdown headers
        .replace(/\n{3,}/g, "\n\n") // Replace multiple newlines with double newlines
        .trim();

      res.status(200).json({
        success: true,
        response: answer,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No answer found",
      });
    }
  } catch (error) {
    console.error("Error in StudentQueryResolver:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
