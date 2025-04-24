CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  chat_id INTEGER NOT NULL REFERENCES chats(id),
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cs_program (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  course_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  credits INTEGER NOT NULL,
  description TEXT NOT NULL,
  prerequisites TEXT,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  syllabus TEXT
);

CREATE TABLE IF NOT EXISTS faculty (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  office TEXT,
  bio TEXT,
  image_url TEXT,
  research_interests TEXT,
  role TEXT
);

CREATE TABLE IF NOT EXISTS research_areas (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url TEXT,
  website_url TEXT
);

CREATE TABLE IF NOT EXISTS faculty_research_areas (
  id SERIAL PRIMARY KEY,
  faculty_id INTEGER NOT NULL REFERENCES faculty(id),
  research_area_id INTEGER NOT NULL REFERENCES research_areas(id)
);

CREATE TABLE IF NOT EXISTS graduate_programs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  degree TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  application_info TEXT,
  contact_info TEXT
);

CREATE TABLE IF NOT EXISTS file_uploads (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  chat_id INTEGER REFERENCES chats(id),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  path TEXT NOT NULL,
  mimetype TEXT NOT NULL,
  size INTEGER NOT NULL,
  uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  content_extracted BOOLEAN DEFAULT FALSE
);
