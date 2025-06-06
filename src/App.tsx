import React, { useState } from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { TaskFilters } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';
import { Task, TaskFormData } from './types/Task';

function App() {
  const {
    tasks,
    loading,
    createTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    getTasks,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Task['category'] | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Task['priority'] | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<boolean | 'all'>('all');

  const filteredTasks = getTasks({
    search: searchTerm,
    category: categoryFilter,
    priority: priorityFilter,
    completed: statusFilter,
  });

  const handleCreateTask = (taskData: TaskFormData) => {
    createTask(taskData);
    setShowForm(false);
  };

  const handleUpdateTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">TaskFlow</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A beautiful and powerful task management system to help you stay organized and productive.
            Create, organize, and track your tasks with ease.
          </p>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Quick Action Button */}
        {!showForm && !editingTask && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-6 h-6" />
              Create New Task
            </button>
          </div>
        )}

        {/* Task Form */}
        {(showForm || editingTask) && (
          <div className="mb-8">
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={editingTask ? handleCancelEdit : () => setShowForm(false)}
              initialData={editingTask ? {
                title: editingTask.title,
                description: editingTask.description,
                category: editingTask.category,
                priority: editingTask.priority,
                dueDate: editingTask.dueDate,
              } : undefined}
              isEditing={!!editingTask}
            />
          </div>
        )}

        {/* Filters */}
        {tasks.length > 0 && (
          <TaskFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        )}

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckSquare className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {tasks.length === 0
                  ? 'Create your first task to get started with TaskFlow.'
                  : 'Try adjusting your search or filter criteria.'}
              </p>
              {tasks.length === 0 && !showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Task
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;