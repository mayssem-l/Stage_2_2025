export interface Task {
  taskId?: number;
  username?: string,
  userId?: number,
  title: string;
  description: string;
  category: string;
  status: string;
  dueDate: string;
}
