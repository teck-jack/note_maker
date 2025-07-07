# Notes App - Full Stack MERN Application

A beautiful, full-featured notes application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring tags, search functionality, and a modern design.

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
   npm install
   
   # Install backend dependencies
   cd server
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
   npm run dev:full
   ```
   
   Option 2 - Run separately:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Project Structure

```
notes-app/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── services/          # API services
│   └── App.tsx            # Main app component
├── server/                 # Backend source
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── server.js          # Express server
└── README.md
```

## Features in Detail

### Notes Management
- Create notes with rich content and multiple tags
- Delete notes with smooth animations
- Responsive grid layout that adapts to screen size

### Search & Filter
- Real-time search across note titles and content
- Click on any tag to filter notes by that tag
- Clear filters easily with dedicated controls

### User Experience
- Beautiful gradient backgrounds and hover effects
- Smooth transitions and micro-interactions
- Loading states and error handling
- Mobile-responsive design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.