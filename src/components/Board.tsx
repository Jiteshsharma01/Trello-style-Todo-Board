import React, { useEffect, useState } from 'react';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Lane from './Lane';
import { Todo } from '../types';
import { fetchTodos, updateTodo, deleteTodo } from '../apiConfig/api';

const Board: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const groupedTodos: Record<string, Todo[]> = {
    Pending: [],
    'In Progress': [],
    Completed: [],
  };

  todos.forEach(todo => {
    groupedTodos[todo.status || 'Pending'].push(todo);
  });

  useEffect(() => {
    fetchTodos().then((res) => {
      const todosWithStatus = res.data.todos.map((t: Todo) => ({
        ...t,
        status: t.completed ? 'Completed' : 'Pending',
      }));
      setTodos(todosWithStatus);
    });
  }, []);

//   const onDragEnd = async (result: DropResult) => {
//     const { destination, source, draggableId } = result;
//     if (!destination || destination.droppableId === source.droppableId) return;

//     const draggedTodo = todos.find(t => t.id === Number(draggableId));
//     if (!draggedTodo) return;

//     const updatedTodo = { ...draggedTodo, status: destination.droppableId as Todo['status'] };

//     await updateTodo(updatedTodo.id, updatedTodo);
//     setTodos(prev =>
//       prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t))
//     );
//   };

  const handleEdit = (todo: Todo) => {
    const newTitle = prompt('Edit todo', todo.todo);
    if (!newTitle) return;

    const updated = { ...todo, todo: newTitle };
    updateTodo(todo.id, updated).then(() => {
      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    });
  };

  const handleDelete = (id: number) => {
    deleteTodo(id).then(() => {
      setTodos(prev => prev.filter(t => t.id !== id));
    });
  };

  return (
    // <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {Object.keys(groupedTodos).map(status => (
          <Lane
            key={status}
            status={status}
            todos={groupedTodos[status]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    // </DragDropContext>
  );
};

export default Board;
