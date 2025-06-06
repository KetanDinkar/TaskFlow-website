import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../types/Task';

const STORAGE_KEY = 'crud-tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const createTask = (taskData: TaskFormData): Task => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<TaskFormData>): void => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const toggleTaskCompletion = (id: string): void => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string): void => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTasks = (filter?: {
    search?: string;
    category?: Task['category'] | 'all';
    priority?: Task['priority'] | 'all';
    completed?: boolean | 'all';
  }) => {
    let filteredTasks = tasks;

    if (filter?.search) {
      const searchLower = filter.search.toLowerCase();
      filteredTasks = filteredTasks.filter(
        task =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    if (filter?.category && filter.category !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === filter.category);
    }

    if (filter?.priority && filter.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
    }

    if (filter?.completed !== undefined && filter.completed !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.completed === filter.completed);
    }

    return filteredTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    getTasks,
  };
};