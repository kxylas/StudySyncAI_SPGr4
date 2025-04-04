import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertChat = z.infer<typeof insertChatSchema>;
export type Chat = typeof chats.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertProgramInfo = z.infer<typeof insertProgramInfoSchema>;
export type ProgramInfo = typeof csProgram.$inferSelect;
