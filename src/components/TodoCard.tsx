import React from 'react';
import { Todo } from '../types';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-3 mb-3">
      <div className="font-medium text-base">{todo.todo}</div>
      <div className="mt-2 flex justify-between">
        <button onClick={() => onEdit(todo)} className="text-sm text-blue-500">Edit</button>
        <button onClick={() => onDelete(todo.id)} className="text-sm text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;
