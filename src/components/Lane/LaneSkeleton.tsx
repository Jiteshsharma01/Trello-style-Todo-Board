import React from 'react'
import { Todo } from '../../types';
import TodoCardSkeleton from '../TodoCard/TodoCardSkeleton';

interface LaneSkeletonProps {
  status: string;
  todos: Todo[];
}

const LaneSkeleton: React.FC<LaneSkeletonProps> = ({
    status,
    todos,
}) => {
  return (
    <div className="flex-shrink-0 w-72 bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{status}</h3>
        <div className="flex gap-2">
          <div
            className="text-green-500 hover:text-green-700 text-sm"
            title="Add todo"
          >
            ➕
          </div>
        </div>
      </div>
      
      <div 
        className="space-y-2 min-h-[100px] h-[60vh] overflow-y-auto"
      >
        {todos.map(todo => (
            <TodoCardSkeleton
              key={todo.id}
              todo={todo}
            />
        ))}
      </div>
    </div>
  )
}

export default LaneSkeleton