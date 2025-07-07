import React from 'react';
import { Trash2, Calendar, Tag, Edit3 } from 'lucide-react';
import { Note } from '../services/api';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
  onTagClick: (tag: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit, onTagClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors flex-1 mr-4">
          {note.title}
        </h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            className="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-blue-50"
            title="Edit note"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {note.content}
      </p>
      
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => onTagClick(tag)}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </button>
          ))}
        </div>
      )}
      
      <div className="flex items-center text-sm text-gray-500">
        <Calendar size={14} className="mr-1" />
        {formatDate(note.createdAt)}
      </div>
    </div>
  );
};

export default NoteCard;