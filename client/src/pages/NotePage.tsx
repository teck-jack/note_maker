import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, RefreshCw } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import SearchBar from '../components/SearchBar';
import { notesApi, Note, CreateNoteData } from '../services/api';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [searchTerm, selectedTag]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setServerError(false);
      const fetchedNotes = await notesApi.getNotes(searchTerm, selectedTag);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (noteData: CreateNoteData) => {
    try {
      setIsLoading(true);
      await notesApi.createNote(noteData);
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNote = async (noteData: CreateNoteData) => {
    if (!editingNote) return;
    
    try {
      setIsLoading(true);
      await notesApi.updateNote(editingNote._id, noteData);
      setEditingNote(null);
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (noteData: CreateNoteData) => {
    if (editingNote) {
      handleUpdateNote(noteData);
    } else {
      handleCreateNote(noteData);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesApi.deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setShowForm(false);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setShowForm(!showForm);
    if (!showForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSearchTerm('');
  };

  const handleTagClear = () => {
    setSelectedTag('');
  };

  if (serverError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <RefreshCw size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Server Connection Error</h2>
          <p className="text-gray-600 mb-6">
            Unable to connect to the server. Please make sure the backend server is running on port 5000.
          </p>
          <button
            onClick={fetchNotes}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Slide-in Form (positioned fixed at top) */}
      {showForm && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCancelEdit}
          />
          <div className="fixed inset-x-0 top-0 z-50 animate-slideDown">
            <div className="bg-white shadow-lg rounded-b-xl p-6 mx-auto max-w-2xl">
              <NoteForm 
                onSubmit={handleFormSubmit} 
                onCancel={handleCancelEdit}
                isLoading={isLoading} 
                editingNote={editingNote}
              />
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={32} />
          <h1 className="text-4xl font-bold text-gray-800">Notes App</h1>
        </div>
        <p className="text-gray-600 text-lg">Organize your thoughts with tags and search</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleNewNote}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          {showForm && !editingNote ? 'Cancel' : 'New Note'}
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTag={selectedTag}
          onTagClear={handleTagClear}
        />
      </div>

      {/* Notes Grid */}
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedTag ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedTag 
                ? 'Try adjusting your search or filter criteria' 
                : 'Create your first note to get started'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;