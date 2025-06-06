export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'shopping' | 'health' | 'other';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: Task['category'];
  priority: Task['priority'];
  dueDate: string;
}