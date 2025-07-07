# Notes App - Full Stack MERN Application

A notes application built with the MERN stack (MongoDB, Express.js, React, Node.js)

## Features

### Frontend (React + Vite + Tailwind CSS)
- ✅ Clean, modern UI with responsive design
- ✅ Create notes with title, content, and tags
- ✅ Display notes in a beautiful card grid layout
- ✅ Search notes by title or content
- ✅ Filter notes by clicking on tags
- ✅ Delete notes with confirmation
- ✅ Real-time search and filtering
- ✅ Loading states and error handling

### Backend (Node.js + Express + MongoDB)
- ✅ RESTful API with proper error handling
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled for frontend communication
- ✅ Environment variable configuration
- ✅ Input validation and sanitization

## API Endpoints

- `GET /api/notes` - Get all notes (with optional search and tag filtering)
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Delete a note by ID
- `GET /api/health` - Health check endpoint

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation & Setup

1. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd server
   npm init -y        
   npm install
   ```

2. **Setup Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/notesapp
   ```

3. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB locally:
   ```bash
   mongod
   ```

4. **Run the Application**
   
   Option 1 - Run both frontend and backend concurrently:
   ```bash
   npm run dev
   ```
   
   Option 2 - Run separately:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
