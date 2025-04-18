export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  status: "Pending" | "In Progress" | "Completed";
}
