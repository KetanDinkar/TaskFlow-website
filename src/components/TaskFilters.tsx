import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  categoryFilter: Task['category'] | 'all';
  onCategoryChange: (category: Task['category'] | 'all') => void;
  priorityFilter: Task['priority'] | 'all';
  onPriorityChange: (priority: Task['priority'] | 'all') => void;
  statusFilter: boolean | 'all';
  onStatusChange: (status: boolean | 'all') => void;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
] as const;

const priorities = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
] as const;

const statuses = [
  { value: 'all', label: 'All Tasks' },
  { value: false, label: 'Active' },
  { value: true, label: 'Completed' },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value as Task['category'] | 'all')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value as Task['priority'] | 'all')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={statusFilter === 'all' ? 'all' : statusFilter.toString()}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'all') {
                onStatusChange('all');
              } else {
                onStatusChange(value === 'true');
              }
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={String(status.value)} value={String(status.value)}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};