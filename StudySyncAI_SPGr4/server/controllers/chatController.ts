import { Request, Response } from "express";
import { queryOpenAI, generateLocalResponse } from "../lib/openai";
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

    // Check if we're receiving too many similar questions in a row
    const lastUserMessages = history
      ?.filter((msg: { role: string; content: string }) => msg.role === "user")
      ?.slice(-3)
      ?.map((msg: { role: string; content: string }) => msg.content.toLowerCase()) || [];
      
    const isRepeatedQuestion = lastUserMessages.length >= 2 && 
      lastUserMessages.some((msg: string) => message.toLowerCase().trim() === msg.trim());

    // Convert the client history format to the format expected by OpenAI
    const formattedHistory = history?.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      content: msg.content,
    })) || [];

    try {
      // If user is repeating the same question multiple times, modify our approach
      if (isRepeatedQuestion) {
        // Add a hint to the formatted history to guide the fallback mechanism
        formattedHistory.push({
          role: "system",
          content: "The user has asked a similar question multiple times. Provide a different response approach focusing on specific examples and details."
        });
      }
      
      // Get response from OpenAI or the local fallback mechanism
      const aiResponse = await queryOpenAI(message, formattedHistory);
      
      // Return the AI's response
      return res.json({ message: aiResponse });
    } catch (error: unknown) {
      console.error("Error in AI processing:", error);
      
      // Check if this is a rate limit or quota error
      const errorMessage = String(error).toLowerCase();
      const isQuotaError = errorMessage.includes('quota') || 
                          errorMessage.includes('rate limit') || 
                          errorMessage.includes('429');
      
      if (isQuotaError) {
        console.log("Using direct local fallback due to quota error");
        // Use our local fallback mechanism directly instead of through queryOpenAI
        try {
          const fallbackResponse = generateLocalResponse(message, formattedHistory);
          return res.json({ message: fallbackResponse });
        } catch (fallbackError) {
          console.error("Local fallback failed:", fallbackError);
          // If even that fails, provide a generic response
          return res.json({ 
            message: "I apologize for the technical difficulties. I can still help with information about Morgan State's Computer Science program. Please ask a specific question about courses, requirements, faculty, or career opportunities." 
          });
        }
      } else {
        // For other types of errors, give a helpful error message
        return res.json({ 
          message: "I'm having trouble processing your request right now. Could you please try rephrasing your question or asking about a specific aspect of the Morgan State CS program?" 
        });
      }
    }
  } catch (error: unknown) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ message: "Failed to process your request. Please try again later." });
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
  } catch (error: unknown) {
    console.error("Error in clearChat:", error);
    return res.status(500).json({ message: "Failed to clear chat" });
  }
};
