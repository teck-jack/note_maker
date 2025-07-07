import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// GET /notes - Get all notes with optional search and tag filtering
router.get('/', async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /notes/:id - Get a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /notes - Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const note = new Note({
      title,
      content,
      tags: tags || []
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /notes/:id - Update an existing note
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tags: tags || [] },
      { new: true, runValidators: true }
    );
    
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;