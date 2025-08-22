export interface Task {
  taskId?: number;
  userId?: number,
  title: string;
  description: string;
  category: string;
  status: string;
  dueDate: string;
}
