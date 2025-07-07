import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tags?: string[];
}

export interface UpdateNoteData {
  title: string;
  content: string;
  tags?: string[];
}

export const notesApi = {
  // Get all notes with optional search and tag filtering
  getNotes: async (search?: string, tag?: string): Promise<Note[]> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (tag) params.append('tag', tag);
    
    const response = await api.get(`/notes?${params.toString()}`);
    return response.data;
  },

  // Get a single note by ID
  getNote: async (id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  // Create a new note
  createNote: async (noteData: CreateNoteData): Promise<Note> => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  // Update an existing note
  updateNote: async (id: string, noteData: UpdateNoteData): Promise<Note> => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  // Delete a note
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};

export default notesApi;