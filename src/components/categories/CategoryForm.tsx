import React from 'react';
import { useForm } from 'react-hook-form';
import { Tag } from 'lucide-react';
import { Category } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CategoryFormProps {
  onSubmit: (data: Omit<Category, 'id'>) => void;
  initialData?: Category;
  isLoading?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  onSubmit, 
  initialData, 
  isLoading = false 
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Category, 'id'>>({
    defaultValues: initialData || {
      name: '',
      color: '#0ea5e9', // Default to primary color
      userId: '1', // This would come from auth in a real app
    },
  });
  
  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Category Name"
        placeholder="Enter category name"
        error={errors.name?.message}
        leftIcon={<Tag size={18} />}
        {...register('name', { required: 'Category name is required' })}
      />
      
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <input
          type="color"
          id="color"
          className="h-10 w-full rounded-md border border-gray-300 cursor-pointer"
          {...register('color', { required: 'Color is required' })}
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
        >
          {initialData ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;