import React, { useState } from 'react';
import { Todo } from '../../types';

interface TodoCardProps {
  todo: Todo;
  onDragStart: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDragStart, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', todo.id.toString());
    onDragStart(todo);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit({ ...todo, todo: editedText });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.todo);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg shadow p-3 cursor-move hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <div className="mb-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full p-1 border rounded"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button 
              onClick={handleSave}
              className="border text-sm text-blue-500 hover:text-blue-700 px-2 py-1 rounded"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="border text-sm text-red-500 hover:text-red-700 px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="font-medium line-clamp-2">{todo.todo}</p>
          {isHovered && (
            <div className="mt-2 flex justify-end gap-3">
              <button 
                onClick={handleEditClick}
                className="cursor-pointer text-sm"
                aria-label="Edit todo"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="cursor-pointer text-sm"
                aria-label="Delete todo"
              >
                🗑️
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoCard;