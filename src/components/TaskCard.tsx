import React, { useState } from 'react';
import { 
  Calendar, 
  Edit, 
  Trash2, 
  Check, 
  AlertCircle, 
  Clock,
  Briefcase,
  User,
  ShoppingCart,
  Heart,
  Tag
} from 'lucide-react';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const categoryIcons = {
  work: Briefcase,
  personal: User,
  shopping: ShoppingCart,
  health: Heart,
  other: Tag,
};

const categoryColors = {
  work: 'bg-blue-100 text-blue-800 border-blue-200',
  personal: 'bg-green-100 text-green-800 border-green-200',
  shopping: 'bg-purple-100 text-purple-800 border-purple-200',
  health: 'bg-red-100 text-red-800 border-red-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200',
};

const priorityColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const CategoryIcon = categoryIcons[task.category];
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const isToday = new Date(task.dueDate).toDateString() === new Date().toDateString();

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
        task.completed ? 'opacity-75' : ''
      } ${isDeleting ? 'scale-95 opacity-0' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {task.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          <h3
            className={`text-lg font-semibold transition-all duration-200 ${
              task.completed
                ? 'line-through text-gray-500'
                : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      <p className={`text-gray-600 mb-4 ${task.completed ? 'line-through' : ''}`}>
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
              categoryColors[task.category]
            }`}
          >
            <CategoryIcon className="w-3.5 h-3.5" />
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </div>

          <div className="flex items-center gap-1">
            <AlertCircle className={`w-4 h-4 ${priorityColors[task.priority]}`} />
            <span className={`text-sm font-medium ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 text-sm ${
              isOverdue
                ? 'text-red-600'
                : isToday
                ? 'text-amber-600'
                : 'text-gray-500'
            }`}
          >
            {isOverdue ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Calendar className="w-4 h-4" />
            )}
            <span className="font-medium">
              {isToday ? 'Today' : formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>

      {isOverdue && !task.completed && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">This task is overdue</span>
          </div>
        </div>
      )}
    </div>
  );
};