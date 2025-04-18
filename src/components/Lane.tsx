import React from 'react';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';
import { Todo } from '../types';

interface LaneProps {
  status: string;
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const Lane: React.FC<LaneProps> = ({ status, todos, onEdit, onDelete }) => {
    console.log({todos});
    
  return (
    <div className="w-full md:w-1/3 p-2">
      <h2 className="text-xl font-semibold mb-2">{status}</h2>
      {/* <Droppable droppableId={status}>
        {(provided) => ( */}
          <div
            className="bg-gray-100 rounded-xl p-3 min-h-[300px]"
            // ref={provided.innerRef}
            // {...provided.droppableProps}
          >
            {todos.map((todo, index: number) => (
            //   <Draggable draggableId={String(todo.id)} index={index} key={todo.id}>
            //     {(provided) => (
                  <div
                    // ref={provided.innerRef}
                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                  >
                    <TodoCard key={index} todo={todo} onEdit={onEdit} onDelete={onDelete} />
                  </div>
            //     )}
            //   </Draggable>
            ))}
            {/* {provided.placeholder} */}
          </div>
        {/* )}
      </Droppable> */}
    </div>
  );
};

export default Lane;
