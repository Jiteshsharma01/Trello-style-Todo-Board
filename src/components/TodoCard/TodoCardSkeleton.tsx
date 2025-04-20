import React from "react";
import { Todo } from "../../types";

interface TodoCardSkeletonProps {
  todo: Todo;
}

const TodoCardSkeleton: React.FC<TodoCardSkeletonProps> = () => {
  return (
    <div className="bg-white rounded-lg shadow p-3 cursor-move hover:shadow-md transition-shadow animate-pulse">
      <div className="h-8 bg-gray-100 rounded-xs w-5/6"></div>
      <div className="mt-2 flex justify-end gap-3">
        <div className="cursor-pointer text-sm">✏️</div>
        <div className="cursor-pointer text-sm">🗑️</div>
      </div>
    </div>
  );
};

export default TodoCardSkeleton;
