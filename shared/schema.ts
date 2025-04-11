import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(), 
  chatId: integer("chat_id").references(() => chats.id).notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const csProgram = pgTable("cs_program", {
  id: serial("id").primaryKey(),
  section: text("section").notNull(), // e.g., 'overview', 'requirements', 'courses'
  title: text("title").notNull(),
  content: text("content").notNull(),
});

// New table for detailed course information
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseCode: text("course_code").notNull().unique(), // e.g., "COSC 111"
  title: text("title").notNull(), // e.g., "Introduction to Computer Science I" 
  credits: integer("credits").notNull(), // e.g., 4
  description: text("description").notNull(),
  prerequisites: text("prerequisites"), // Can be null if no prerequisites
  category: text("category").notNull(), // e.g., "Core", "Group A Elective", etc.
  level: text("level").notNull(), // e.g., "Undergraduate", "Graduate"
  syllabus: text("syllabus"), // Optional detailed syllabus
});

// New table for faculty information
export const faculty = pgTable("faculty", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(), // e.g., "Professor", "Associate Professor", etc.
  email: text("email").notNull().unique(),
  phone: text("phone"),
  office: text("office"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  researchInterests: text("research_interests"),
  role: text("role"), // e.g., "Chair", "Associate Chair", "Faculty", etc.
});

// Table for research areas
export const researchAreas = pgTable("research_areas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // e.g., "Artificial Intelligence"
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  websiteUrl: text("website_url"),
});

// Junction table for faculty and research areas (many-to-many)
export const facultyResearchAreas = pgTable("faculty_research_areas", {
  id: serial("id").primaryKey(),
  facultyId: integer("faculty_id").references(() => faculty.id).notNull(),
  researchAreaId: integer("research_area_id").references(() => researchAreas.id).notNull(),
});

// Table for graduate programs
export const graduatePrograms = pgTable("graduate_programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  degree: text("degree").notNull(), // e.g., "M.S.", "Ph.D."
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  applicationInfo: text("application_info"),
  contactInfo: text("contact_info"),
});

// Table for file uploads
export const fileUploads = pgTable("file_uploads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  chatId: integer("chat_id").references(() => chats.id),
  filename: text("filename").notNull(),
  originalFilename: text("original_filename").notNull(),
  path: text("path").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  contentExtracted: boolean("content_extracted").default(false),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  chats: many(chats),
  fileUploads: many(fileUploads),
}));

export const chatsRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
  messages: many(messages),
  fileUploads: many(fileUploads),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
}));

export const facultyRelations = relations(faculty, ({ many }) => ({
  researchAreas: many(facultyResearchAreas),
}));

export const researchAreasRelations = relations(researchAreas, ({ many }) => ({
  faculty: many(facultyResearchAreas),
}));

export const facultyResearchAreasRelations = relations(facultyResearchAreas, ({ one }) => ({
  faculty: one(faculty, {
    fields: [facultyResearchAreas.facultyId],
    references: [faculty.id],
  }),
  researchArea: one(researchAreas, {
    fields: [facultyResearchAreas.researchAreaId],
    references: [researchAreas.id],
  }),
}));

export const fileUploadsRelations = relations(fileUploads, ({ one }) => ({
  user: one(users, {
    fields: [fileUploads.userId],
    references: [users.id],
  }),
  chat: one(chats, {
    fields: [fileUploads.chatId],
    references: [chats.id],
  }),
}));

// Schemas for inserting data
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertChatSchema = createInsertSchema(chats).pick({
  userId: true,
  title: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  chatId: true,
  role: true,
  content: true,
});

export const insertProgramInfoSchema = createInsertSchema(csProgram).pick({
  section: true,
  title: true,
  content: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  courseCode: true,
  title: true,
  credits: true,
  description: true,
  prerequisites: true,
  category: true,
  level: true,
  syllabus: true,
});

export const insertFacultySchema = createInsertSchema(faculty).pick({
  name: true,
  title: true,
  email: true,
  phone: true,
  office: true,
  bio: true,
  imageUrl: true,
  researchInterests: true,
  role: true,
});

export const insertResearchAreaSchema = createInsertSchema(researchAreas).pick({
  name: true,
  description: true,
  imageUrl: true,
  websiteUrl: true,
});

export const insertGraduateProgramSchema = createInsertSchema(graduatePrograms).pick({
  name: true,
  degree: true,
  description: true,
  requirements: true,
  applicationInfo: true,
  contactInfo: true,
});

export const insertFacultyResearchAreaSchema = createInsertSchema(facultyResearchAreas).pick({
  facultyId: true,
  researchAreaId: true,
});

export const insertFileUploadSchema = createInsertSchema(fileUploads).pick({
  userId: true,
  chatId: true,
  filename: true,
  originalFilename: true,
  path: true,
  mimetype: true,
  size: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertChat = z.infer<typeof insertChatSchema>;
export type Chat = typeof chats.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertProgramInfo = z.infer<typeof insertProgramInfoSchema>;
export type ProgramInfo = typeof csProgram.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type Faculty = typeof faculty.$inferSelect;

export type InsertResearchArea = z.infer<typeof insertResearchAreaSchema>;
export type ResearchArea = typeof researchAreas.$inferSelect;

export type InsertGraduateProgram = z.infer<typeof insertGraduateProgramSchema>;
export type GraduateProgram = typeof graduatePrograms.$inferSelect;

export type InsertFacultyResearchArea = z.infer<typeof insertFacultyResearchAreaSchema>;
export type FacultyResearchArea = typeof facultyResearchAreas.$inferSelect;

export type InsertFileUpload = z.infer<typeof insertFileUploadSchema>;
export type FileUpload = typeof fileUploads.$inferSelect;
