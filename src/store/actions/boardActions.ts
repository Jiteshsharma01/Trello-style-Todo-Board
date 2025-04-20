import { Todo } from '../../types';
import {
  fetchTodos as apiFetchTodos,
  createTodo as apiCreateTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo
} from '../../apiConfig/api';
import { AppThunk } from '../store';

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_STATUS = 'ADD_STATUS';
export const DELETE_STATUS = 'DELETE_STATUS';
export const UPDATE_TODOS_ORDER = 'UPDATE_TODOS_ORDER';

export const fetchTodos = (): AppThunk => async (dispatch) => {
  dispatch({ type: FETCH_TODOS_REQUEST });
  try {
    const response = await apiFetchTodos();
    const todosWithStatus = response.data.todos.map((todo: Todo) => ({
      ...todo,
      status: todo.completed ? 'Completed' : 'Pending'
    }));
    dispatch({
      type: FETCH_TODOS_SUCCESS,
      payload: todosWithStatus
    });
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAILURE, payload: (error as Error).message });
  }
};

export const addTodo = (todoData: { 
  todo: string; 
  status: string;
  completed?: boolean;
  userId: number 
}): AppThunk => async (dispatch) => {
  try {
    const response = await apiCreateTodo({
      todo: todoData.todo,
      completed: todoData.status === 'Completed',
      userId: todoData.userId
    });

    dispatch({
      type: ADD_TODO,
      payload: { 
        ...response.data,
        status: todoData.status,
        // id: response.data.id ?? Date.now()   //response id must be unique
        id: Date.now()
      }
    });
  } catch (error) {
    console.error('Error adding todo:', error);
    dispatch({
      type: FETCH_TODOS_FAILURE,
      payload: `Failed to add todo: ${(error as Error).message}`
    });
  }
};

export const updateTodoStatus = (
  id: number, 
  status: string, 
  newIndex?: number
): AppThunk => async (dispatch, getState) => {
  const { board } = getState();
  const todo = board.todos.find((t: Todo) => t.id === id);
  
  if (!todo) return;

  try {
    // 1. First update the status in the backend (if supported)
    await apiUpdateTodo(id, { 
      completed: status === 'Completed',
      todo: todo.todo 
      // Note: DummyJSON doesn't support status field, so we're just updating what we can
    });
    
    // 2. Get current todos and prepare the update
    const currentTodos = [...board.todos];
    
    // 3. Remove the todo from its current position
    const todoIndex = currentTodos.findIndex(t => t.id === id);
    if (todoIndex === -1) return;
    
    const [movedTodo] = currentTodos.splice(todoIndex, 1);
    
    // 4. If newIndex is provided, find the correct position to insert
    if (typeof newIndex !== 'undefined') {
      // Get all todos with the new status
      const targetStatusTodos = currentTodos.filter(t => t.status === status);
      
      // Determine insertion point
      if (newIndex >= targetStatusTodos.length) {
        // Append to end
        currentTodos.push({ ...movedTodo, status });
      } else if (newIndex <= 0) {
        // Insert at beginning
        const firstTargetIndex = currentTodos.findIndex(t => t.status === status);
        currentTodos.splice(
          firstTargetIndex >= 0 ? firstTargetIndex : currentTodos.length, 
          0, 
          { ...movedTodo, status }
        );
      } else {
        // Insert between two todos
        const targetTodo = targetStatusTodos[newIndex - 1];
        const insertIndex = currentTodos.findIndex(t => t.id === targetTodo.id) + 1;
        currentTodos.splice(insertIndex, 0, { ...movedTodo, status });
      }
    } else {
      // Just change status without reordering
      currentTodos.push({ ...movedTodo, status });
    }
    
    dispatch({
      type: UPDATE_TODOS_ORDER,
      payload: currentTodos
    });
  } catch (error) {
    console.error('Error updating todo status:', error);
  }
};

export const updateTodo = (updatedTodo: Todo): AppThunk => async (dispatch) => {
  try {
    await apiUpdateTodo(updatedTodo.id, { 
      todo: updatedTodo.todo,
      completed: updatedTodo.status === 'Completed'
    });
    dispatch({
      type: UPDATE_TODO,
      payload: updatedTodo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

export const removeTodo = (id: number): AppThunk => async (dispatch) => {
  try {
    await apiDeleteTodo(id);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

export const addStatus = (status: string): AppThunk => (dispatch, getState) => {
  const { board } = getState();
  if (!board.statuses.includes(status)) {
    dispatch({ type: ADD_STATUS, payload: status });
  }
};

export const deleteStatus = (status: string): AppThunk => (dispatch, getState) => {
  const { board } = getState();
  
  // Don't allow deletion of default statuses
  if (['Pending', 'In Progress', 'Completed'].includes(status)) {
    return;
  }
  
  // Move todos with this status to Pending
  board.todos
    .filter((todo: Todo) => todo.status === status)
    .forEach((todo: Todo) => {
      dispatch(updateTodoStatus(todo.id, 'Pending'));
    });
  
  dispatch({ type: DELETE_STATUS, payload: status });
};