import React from 'react';
import { Todo } from '../../types';
import DropArea from '../DropArea/DropArea';
import TodoCard from '../TodoCard/TodoCard';

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
  onDeleteStatus
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-shrink-0 w-72 bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{status}</h3>
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
      
      <div 
        className="space-y-2 min-h-[100px] h-[60vh] overflow-y-scroll"
        onDragOver={handleDragOver}
      >
        <DropArea onDrop={() => onDrop(status, 0)} />
        
        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <TodoCard
              todo={todo}
              onDragStart={onDragStart}
            />
            <DropArea onDrop={() => onDrop(status, index + 1)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Lane;