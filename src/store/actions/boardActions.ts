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

export const addTodo = (todoData: { todo: string; userId: number }): AppThunk => async (dispatch) => {
  try {
    const response = await apiCreateTodo(todoData);
    dispatch({
      type: ADD_TODO,
      payload: { ...response.data, status: 'Pending' }
    });
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

export const updateTodoStatus = (id: number, status: string): AppThunk => async (dispatch, getState) => {
  const { board } = getState();
  const todo = board.todos.find((t: Todo) => t.id === id);
  
  if (!todo) return;

  try {
    // Update in DummyJSON (though it doesn't have status field)
    await apiUpdateTodo(id, { 
      completed: status === 'Completed',
      todo: todo.todo 
    });
    
    dispatch({
      type: UPDATE_TODO,
      payload: { ...todo, status }
    });
  } catch (error) {
    console.error('Error updating todo:', error);
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
    dispatch({
      type: FETCH_TODOS_FAILURE,
      payload: `Failed to update todo: ${error}`
    });
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