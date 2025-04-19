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

  const handleDrop = (status: string) => {
    if (!draggedTodo) return;
    
    // Check if the status is actually changing
    if (draggedTodo.status !== status) {
      dispatch(updateTodoStatus(draggedTodo.id, status));
    }
    setDraggedTodo(null);
  };

  if (loading) return <div className="p-4 text-center">Loading todos...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAddStatusModal(true)}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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