import React, { useState } from 'react';
import { Todo } from '../../types';
import DropArea from '../DropArea/DropArea';
import TodoCard from '../TodoCard/TodoCard';
import { useAppDispatch } from '../../store/hooks';
import { addTodo, removeTodo, updateTodo } from '../../store/actions/boardActions';

interface LaneProps {
  status: string;
  todos: Todo[];
  onDragStart: (todo: Todo) => void;
  onDrop: (status: string, position: number) => void;
  canDelete: boolean;
  onDeleteStatus: () => void;
}

const Lane: React.FC<LaneProps> = ({
  status,
  todos,
  onDragStart,
  onDrop,
  canDelete,
  onDeleteStatus,
}) => {
  const dispatch = useAppDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeleteTodo = (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(removeTodo(id));
    }
  };
  
  const handleEditTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo({
        todo: newTodoText,
        status,
        completed: status === 'Completed',
        userId: 1 // Default user ID or get from auth
      }));
      setNewTodoText('');
      setIsAddingTodo(false);
    }
  };

  return (
    <div className="flex-shrink-0 w-72 bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{status}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddingTodo(true)}
            className="text-green-500 hover:text-green-700 text-sm"
            title="Add todo"
          >
            ➕
          </button>
          {canDelete && (
            <button
              onClick={onDeleteStatus}
              className="text-red-500 hover:text-red-700"
              title="Delete status"
            >
              ✖️
            </button>
          )}
        </div>
      </div>
      
      <div 
        className="space-y-2 min-h-[100px] h-[60vh] overflow-y-auto"
        onDragOver={handleDragOver}
      >
        <DropArea onDrop={() => onDrop(status, 0)} />
        
        {isAddingTodo && (
          <div className="bg-white rounded-lg shadow p-3 mb-2">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Enter todo text"
              className="w-full p-1 border rounded mb-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTodo();
                if (e.key === 'Escape') setIsAddingTodo(false);
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddTodo}
                className="text-sm bg-green-500 text-white px-2 py-1 rounded"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setNewTodoText('');
                  setIsAddingTodo(false);
                }}
                className="text-sm bg-gray-200 px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <TodoCard
              todo={todo}
              onDragStart={onDragStart}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
            <DropArea onDrop={() => onDrop(status, index + 1)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Lane;