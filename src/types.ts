export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  status?: string;
}

export interface BoardState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  statuses: string[];
}

export interface RootState {
  board: BoardState;
}