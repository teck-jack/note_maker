import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesPage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;