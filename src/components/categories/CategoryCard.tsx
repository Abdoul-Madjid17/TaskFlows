import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Category } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card hover className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div 
          className="w-6 h-6 rounded-full mr-3" 
          style={{ backgroundColor: category.color }}
        ></div>
        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
      </div>
      
      <div className="flex justify-end space-x-2 mt-auto">
        <Button 
          variant="outline" 
          size="sm" 
          leftIcon={<Edit size={14} />}
          onClick={() => onEdit(category)}
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          size="sm" 
          leftIcon={<Trash2 size={14} />}
          onClick={() => onDelete(category.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default CategoryCard;