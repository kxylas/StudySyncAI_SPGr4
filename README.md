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
- Git (for cloning the repository)

## Step 1: Install Prerequisites

Before starting, make sure you have these installed on your computer:

- **Git**: Download from [git-scm.com](https://git-scm.com/downloads)
- **Node.js**: Download from [nodejs.org](https://nodejs.org/) (version 18 or higher recommended)
- **PostgreSQL**: Download from [postgresql.org](https://www.postgresql.org/download/)

## Step 2: Clone the Repository

1. Open your terminal or command prompt
2. Navigate to the folder where you want to store the project
3. Run this command to clone the repository:
   ```bash
   git clone https://github.com/yourusername/msuStudySyncAI.git
   ```
   (Replace "yourusername" with the actual GitHub username where the project is hosted)
4. Navigate into the project folder:
   ```bash
   cd msuStudySyncAI
   ```

## Step 3: Install Dependencies

In the project directory, run:
```bash
npm install
```
This will install all the required packages defined in the package.json file.

## Step 4: Set Up Environment Variables

1. Create a new file named `.env` in the root directory of the project
2. Add the following content to the file:
   ```
   # Database Configuration
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/studysyncai
   PGHOST=localhost
   PGPORT=5432
   PGUSER=your_username
   PGPASSWORD=your_password
   PGDATABASE=studysyncai
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   ```
3. Replace `your_username`, `your_password`, and `your_openai_api_key` with your actual PostgreSQL credentials and OpenAI API key

## Step 5: Set Up the Database

1. Open a new terminal window
2. Log into PostgreSQL:
   ```bash
   # On Windows
   psql -U postgres
   
   # On Mac/Linux
   sudo -u postgres psql
   ```
3. Create a new database:
   ```sql
   CREATE DATABASE studysyncai;
   ```
4. Create a user (if you don't already have one):
   ```sql
   CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
   ```
5. Grant privileges:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE studysyncai TO your_username;
   ```
6. Exit PostgreSQL:
   ```
   \q
   ```
7. Return to your project terminal and run the migration to set up the database schema:
   ```bash
   npm run db:push
   ```
8. (Optional) Load sample data into the database:
   ```bash
   tsx server/scripts/populate-knowledge-base.ts
   ```

## Step 6: Start the Application

Run the development server:
```bash
npm run dev
```

The application should now be running at http://localhost:5000

## Troubleshooting Common Issues

1. **"Error: connect ECONNREFUSED"**: Make sure PostgreSQL is running
   ```bash
   # On Windows
   net start postgresql-x64-15 (or your version)
   
   # On Mac
   brew services start postgresql
   
   # On Linux
   sudo service postgresql start
   ```

2. **"Error: role 'your_username' does not exist"**: Make sure you created the database user correctly and updated the .env file

3. **"Error: invalid API key"**: Make sure you have a valid OpenAI API key

4. **"Port 5000 is already in use"**: Change the port in server/index.ts or kill the process using that port


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

## Documentation and Diagrams

The repository contains important documentation assets that are only accessible via the file system (not in the app navigation):

- **System Architecture Diagram**: View the system architecture in `attached_assets/system_architecture_diagram.svg`
- **User Flow Diagram**: View the user flow in `attached_assets/user_flow_diagram.svg`
- **Project Requirements**: Check hardware and software requirements in `project_requirements.txt`
- **Training Data**: Examine the sample data in `attached_assets/training_data.txt` and `attached_assets/graduate_data.txt`

These files provide technical documentation and are intentionally not included in the application navigation for end-users.

