import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as chatController from "./controllers/chatController";
import * as uploadController from "./controllers/uploadController";
import { db } from "./db";
import { courses, faculty, researchAreas, graduatePrograms } from "@shared/schema";
import { eq } from "drizzle-orm";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoints
  app.post('/api/chat/message', chatController.sendMessage);
  app.get('/api/chat/history', chatController.getChatHistory);
  app.post('/api/chat/clear', chatController.clearChat);

  // Course routes
  app.get("/api/courses", async (_req, res) => {
    try {
      const allCourses = await db.select().from(courses);
      res.status(200).json(allCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      if (isNaN(courseId)) {
        return res.status(400).json({ error: "Invalid course ID" });
      }
      
      const [course] = await db.select().from(courses).where(eq(courses.id, courseId));
      
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  // Faculty routes
  app.get("/api/faculty", async (_req, res) => {
    try {
      const allFaculty = await db.select().from(faculty);
      res.status(200).json(allFaculty);
    } catch (error) {
      console.error("Error fetching faculty:", error);
      res.status(500).json({ error: "Failed to fetch faculty" });
    }
  });

  app.get("/api/faculty/:id", async (req, res) => {
    try {
      const facultyId = parseInt(req.params.id);
      if (isNaN(facultyId)) {
        return res.status(400).json({ error: "Invalid faculty ID" });
      }
      
      const [facultyMember] = await db.select().from(faculty).where(eq(faculty.id, facultyId));
      
      if (!facultyMember) {
        return res.status(404).json({ error: "Faculty member not found" });
      }
      
      res.status(200).json(facultyMember);
    } catch (error) {
      console.error("Error fetching faculty member:", error);
      res.status(500).json({ error: "Failed to fetch faculty member" });
    }
  });

  // Research areas routes
  app.get("/api/research-areas", async (_req, res) => {
    try {
      const allResearchAreas = await db.select().from(researchAreas);
      res.status(200).json(allResearchAreas);
    } catch (error) {
      console.error("Error fetching research areas:", error);
      res.status(500).json({ error: "Failed to fetch research areas" });
    }
  });

  // Graduate programs routes
  app.get("/api/graduate-programs", async (_req, res) => {
    try {
      const allGraduatePrograms = await db.select().from(graduatePrograms);
      res.status(200).json(allGraduatePrograms);
    } catch (error) {
      console.error("Error fetching graduate programs:", error);
      res.status(500).json({ error: "Failed to fetch graduate programs" });
    }
  });
  
  // File upload routes
  app.post('/api/uploads', uploadController.uploadSingleFile, uploadController.handleFileUpload);
  app.get('/api/uploads/chat/:chatId', uploadController.getChatFiles);
  app.get('/api/uploads/:id', uploadController.getFile);
  app.delete('/api/uploads/:id', uploadController.deleteFile);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
