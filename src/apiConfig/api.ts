import axios from 'axios';
import { Todo } from '../types';

const API = axios.create({
  baseURL: 'https://dummyjson.com'
});

export const fetchTodos = () => API.get('/todos');

export const createTodo = (data: { todo: string; completed?: boolean; userId: number }) =>
  API.post('/todos/add', data);

export const updateTodo = (id: number, data: Partial<Todo>) =>
  API.patch(`/todos/${id}`, data);

export const deleteTodo = (id: number) =>
  API.delete(`/todos/${id}`);
