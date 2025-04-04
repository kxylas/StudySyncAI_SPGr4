import { Request, Response } from "express";
import { queryOpenAI } from "../lib/openai";
import { nanoid } from "nanoid";
import { Message } from "@shared/schema";

// In-memory storage for chat sessions
let chatSessions: any[] = [];

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ message: "No message provided" });
    }

    // Convert the client history format to the format expected by OpenAI
    const formattedHistory = history?.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    })) || [];

    // Get response from OpenAI
    const aiResponse = await queryOpenAI(message, formattedHistory);

    // Return the AI's response
    return res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ message: "Failed to process your request" });
  }
};

export const getChatHistory = (req: Request, res: Response) => {
  // Return empty array for now since we're using in-memory storage in the frontend
  return res.json([]);
};

export const clearChat = (req: Request, res: Response) => {
  try {
    // Clear the current chat session (would be implemented with real storage)
    return res.json({ message: "Chat cleared successfully" });
  } catch (error) {
    console.error("Error in clearChat:", error);
    return res.status(500).json({ message: "Failed to clear chat" });
  }
};
