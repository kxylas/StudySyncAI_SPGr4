import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as chatController from "./controllers/chatController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoints
  app.post('/api/chat/message', chatController.sendMessage);
  app.get('/api/chat/history', chatController.getChatHistory);
  app.post('/api/chat/clear', chatController.clearChat);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
