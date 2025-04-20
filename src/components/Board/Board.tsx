import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState, Todo } from '../../types';
import Lane from '../Lane/Lane';
import AddStatusModal from '../AddStatusModal/AddStatusModal';
import { 
  fetchTodos, 
  addStatus, 
  deleteStatus,
  updateTodoStatus,
} from '../../store/actions/boardActions';
import BoardSkeleton from './BoardSkeleton';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, statuses, loading, error } = useAppSelector((state: RootState) => state.board);
  const [showAddStatusModal, setShowAddStatusModal] = React.useState(false);
  const [draggedTodo, setDraggedTodo] = React.useState<Todo | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddStatus = (newStatus: string) => {
    dispatch(addStatus(newStatus));
    setShowAddStatusModal(false);
  };

  const handleDeleteStatus = (status: string) => {
    dispatch(deleteStatus(status));
  };

  const handleDrop = (status: string, position: number) => {
    if (!draggedTodo) return;
    
    // Check if position actually changed
    const currentTodosInLane = todos.filter(t => t.status === status);
    const currentPosition = currentTodosInLane.findIndex(t => t.id === draggedTodo.id);
    
    // Only dispatch if status changed or position changed
    if (draggedTodo.status !== status || currentPosition !== position) {
      dispatch(updateTodoStatus(draggedTodo.id, status, position));
    }
    setDraggedTodo(null);
  };

  if (loading) return <BoardSkeleton />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAddStatusModal(true)}
          className="px-4 py-2 rounded border hover:text-blue-600 hover:border hover:border-blue-600 transition-colors"
          aria-label="Add new status"
        >
          + Add Status
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 w-[96vw]">
        {statuses.map((status) => {
          const laneTodos = todos.filter(todo => todo.status === status);
          return (
            <Lane
              key={status}
              status={status}
              todos={laneTodos}
              onDragStart={setDraggedTodo}
              onDrop={handleDrop}
              canDelete={!['Pending', 'In Progress', 'Completed'].includes(status)}
              onDeleteStatus={() => handleDeleteStatus(status)}
            />
          );
        })}
      </div>

      <AddStatusModal
        isOpen={showAddStatusModal}
        onClose={() => setShowAddStatusModal(false)}
        onAdd={handleAddStatus}
        existingStatuses={statuses}
      />
    </div>
  );
};

export default Board;