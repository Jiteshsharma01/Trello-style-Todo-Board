import React from 'react';
import { Todo } from '../../types';

interface TodoCardProps {
  todo: Todo;
  onDragStart: (todo: Todo) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDragStart }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', todo.id.toString());
    onDragStart(todo);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg shadow p-3 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="font-medium">{todo.todo}</div>
      <div className="text-sm text-gray-500 mt-1">
        Status: {todo.status}
      </div>
    </div>
  );
};

export default TodoCard;