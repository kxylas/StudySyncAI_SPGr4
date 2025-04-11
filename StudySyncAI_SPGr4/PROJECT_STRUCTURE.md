# StudySyncAI Project Structure

## Overview

This document outlines the organization and structure of the StudySyncAI codebase to help developers understand and navigate the project.

## Directory Structure

```
├── client                    # Frontend React application
│   ├── src                   # Source code
│   │   ├── assets            # Static assets (images, etc.)
│   │   ├── components        # Reusable React components
│   │   │   ├── ui            # UI components from Shadcn
│   │   │   └── ...           # Custom components
│   │   ├── contexts          # React context providers
│   │   ├── hooks             # Custom React hooks
│   │   ├── lib               # Utility functions
│   │   ├── pages             # Page components
│   │   └── types             # TypeScript type definitions
│   └── index.html            # HTML entry point
├── server                    # Backend Express application
│   ├── controllers           # Request handlers
│   ├── lib                   # Server utilities
│   ├── db.ts                 # Database connection setup
│   ├── routes.ts             # API route definitions 
│   ├── storage.ts            # Data storage interface
│   └── index.ts              # Server entry point
├── shared                    # Shared code between client and server
│   └── schema.ts             # Database schema definitions
└── attached_assets           # External assets for the project
```

## Key Components

### Frontend

1. **App Container**: Main layout wrapper in `client/src/components/AppContainer.tsx`
2. **Chat Interface**: AI chat implementation in `client/src/components/ChatInterface.tsx`
3. **Sidebar**: Navigation sidebar in `client/src/components/Sidebar.tsx`
4. **Program Pages**: Informational pages about the CS program in `client/src/pages/`

### Backend

1. **Chat Controller**: Handles chat requests in `server/controllers/chatController.ts`
2. **OpenAI Integration**: AI processing in `server/lib/openai-fixed.ts`
3. **Database Schema**: Models for users, chats, messages in `shared/schema.ts`
4. **Storage Interface**: Data persistence layer in `server/storage.ts`

## Data Flow

1. User inputs a message in the chat interface
2. Frontend sends message to the backend API
3. Chat controller processes the request
4. OpenAI service generates a response (with fallback mechanism)
5. Response is returned to the frontend
6. Chat history is updated in the UI

## Technology Details

### Frontend

- React for UI components
- TanStack Query for data fetching
- Tailwind CSS for styling
- Shadcn UI for component library
- TypeScript for type safety

### Backend

- Express for API server
- Drizzle ORM for database operations
- PostgreSQL for data storage
- OpenAI API for AI capabilities

## Development Workflow

1. Start the development server with the 'Start application' workflow
2. Frontend changes hot reload automatically
3. Backend changes restart the server
4. Database schema changes require running `npm run db:push`
