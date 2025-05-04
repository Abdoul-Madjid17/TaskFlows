import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, CheckSquare, ListTodo } from 'lucide-react';
import { Task } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import categoryStore from '../../store/categoryStore';

interface TaskFormProps {
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Task;
  isLoading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialData, 
  isLoading = false 
}) => {
  const { categories, fetchCategories } = categoryStore();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      category: '',
      dueDate: new Date().toISOString().split('T')[0],
      userId: '1', // This would come from auth in a real app
    },
  });
  
  useEffect(() => {
    fetchCategories();
    
    if (initialData) {
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = new Date(initialData.dueDate).toISOString().split('T')[0];
      reset({
        ...initialData,
        dueDate: formattedDate,
      });
    }
  }, [fetchCategories, initialData, reset]);
  
  const categoryOptions = categories.map(category => ({
    value: category.name,
    label: category.name,
  }));
  
  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];
  
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Title"
        placeholder="Enter task title"
        error={errors.title?.message}
        leftIcon={<CheckSquare size={18} />}
        {...register('title', { required: 'Title is required' })}
      />
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter task description"
          {...register('description')}
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Category"
          options={categoryOptions}
          error={errors.category?.message}
          {...register('category', { required: 'Category is required' })}
        />
        
        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register('status', { required: 'Status is required' })}
        />
        
        <Select
          label="Priority"
          options={priorityOptions}
          error={errors.priority?.message}
          {...register('priority', { required: 'Priority is required' })}
        />
        
        <Input
          label="Due Date"
          type="date"
          error={errors.dueDate?.message}
          leftIcon={<Calendar size={18} />}
          {...register('dueDate', { required: 'Due date is required' })}
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
          leftIcon={<ListTodo size={18} />}
        >
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;