import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db } from '../db';
import { fileUploads } from '@shared/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'server', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Generate a unique filename with original extension
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Configure file upload limits
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Check if the file type is allowed
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not supported`));
    }
  },
});

// Middleware to handle a single file upload
export const uploadSingleFile = upload.single('file');

// Controller to handle file upload
export const handleFileUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get chat ID from request body
    const chatId = parseInt(req.body.chatId);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: 'Invalid chat ID' });
    }

    // Get user ID (this would normally come from authenticated user)
    // For now, we'll use a default user ID of 1
    const userId = 1;

    // Insert file details into database
    const [fileRecord] = await db.insert(fileUploads).values({
      userId,
      chatId,
      filename: req.file.filename,
      originalFilename: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    }).returning();

    // Return success response with file details
    res.status(201).json({
      message: 'File uploaded successfully',
      file: fileRecord,
    });
    
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

// Controller to get files for a chat
export const getChatFiles = async (req: Request, res: Response) => {
  try {
    const chatId = parseInt(req.params.chatId);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: 'Invalid chat ID' });
    }

    const files = await db.select().from(fileUploads).where(eq(fileUploads.chatId, chatId));
    
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching chat files:', error);
    res.status(500).json({ error: 'Failed to fetch chat files' });
  }
};

// Controller to get a single file
export const getFile = async (req: Request, res: Response) => {
  try {
    const fileId = parseInt(req.params.id);
    if (isNaN(fileId)) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }

    const [file] = await db.select().from(fileUploads).where(eq(fileUploads.id, fileId));
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if file exists on the server
    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    // Set appropriate content type
    res.setHeader('Content-Type', file.mimetype);
    // Set content disposition based on request query
    const disposition = req.query.download === 'true' ? 'attachment' : 'inline';
    res.setHeader('Content-Disposition', `${disposition}; filename="${encodeURIComponent(file.originalFilename)}"`);
    
    // Stream the file
    const fileStream = fs.createReadStream(file.path);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
};

// Controller to delete a file
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const fileId = parseInt(req.params.id);
    if (isNaN(fileId)) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }

    // Get file info first
    const [file] = await db.select().from(fileUploads).where(eq(fileUploads.id, fileId));
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete from database
    await db.delete(fileUploads).where(eq(fileUploads.id, fileId));

    // Delete file from filesystem if it exists
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    res.status(200).json({ message: 'File deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};