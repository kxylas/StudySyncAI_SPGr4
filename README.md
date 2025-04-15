# StudySyncAI - Morgan State University CS Student Support Platform

## Overview

StudySyncAI is a comprehensive AI-powered platform designed to support Morgan State University computer science students throughout their academic journey.

## Team Members and Contributions

- **Kyla Abrahm**: Testing & Quality Assurance - Chatbot Logic, User Interaction, & Adjustments
- **Kayla Flanigan**: Backend Integration & Logic - API Interaction & Data Handling
- **Carlos Mecerdes**: Frontend Development - Core Chat Interface & Basic Features
- **Allen Mhina**: Frontend Development - Advanced Features & UI/UX Enhancements
  
## Key Features

- **AI-Powered Assistant**: Get instant answers about Morgan State's CS program, courses, and requirements
- **Program Information**: Access comprehensive details about the Computer Science curriculum
- **Academic Resources**: Find requirements, advisor information, and program structure
- **Study Tools**: Create and join study groups, track academic progress
- **Career Development**: Explore internship opportunities and professional resources

## Technology Stack

- **Frontend**: React.js with Tailwind CSS and Shadcn UI components
- **Backend**: Node.js with Express 
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI API with fallback mechanisms
- **Styling**: Custom Morgan State University theme (orange, navy blue, dark mode)

## Installation and Setup Guide

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- OpenAI API key

### Step 1: Download and Extract

1. Download the project ZIP file
2. Extract the contents to your preferred location
3. Open a terminal and navigate to the extracted project folder

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

1. Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/studysyncai
PGHOST=localhost
PGPORT=5432
PGUSER=your_database_username
PGPASSWORD=your_database_password
PGDATABASE=studysyncai

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### Step 4: Set Up Database

1. Create a PostgreSQL database named `studysyncai`

2. Run the following command to set up the database schema:

```bash
npm run db:push
```

3. (Optional) If you want to populate the database with sample data:

```bash
tsx server/scripts/populate-knowledge-base.ts
```

### Step 5: Start the Application

```bash
npm run dev
```

The application will start and be accessible at http://localhost:5000

### Step 6: Access the Database

To directly access and manage your PostgreSQL database:

1. **Using pgAdmin (GUI)**:
   - Install pgAdmin from https://www.pgadmin.org/
   - Add a new server connection using the credentials from your `.env` file
   - Connect to the `studysyncai` database

2. **Using psql (Command Line)**:
   ```bash
   psql -U your_database_username -d studysyncai
   ```

3. **Using a database connection string**:
   ```
   postgresql://username:password@localhost:5432/studysyncai
   ```

### Troubleshooting

- **Database Connection Issues**: Verify your PostgreSQL service is running and check the credentials in your `.env` file
- **OpenAI API Errors**: Ensure your API key is valid and has sufficient credits
- **Port Conflicts**: If port 5000 is already in use, you can modify the port in `server/index.ts`
