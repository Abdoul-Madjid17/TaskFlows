import React from 'react';
import { format } from 'date-fns';
import { Clock, Edit, Trash2 } from 'lucide-react';
import { Task } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const priorityVariant = {
    low: 'info',
    medium: 'warning',
    high: 'danger',
  } as const;
  
  const statusVariant = {
    todo: 'primary',
    'in-progress': 'warning',
    done: 'success',
  } as const;
  
  const formattedDueDate = format(new Date(task.dueDate), 'MMM dd, yyyy');
  
  return (
    <Card hover className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{task.title}</h3>
        <Badge variant={priorityVariant[task.priority]}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Badge>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary">{task.category}</Badge>
        <Badge variant={statusVariant[task.status]}>
          {task.status === 'todo' ? 'To Do' : 
           task.status === 'in-progress' ? 'In Progress' : 'Done'}
        </Badge>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <Clock size={14} className="mr-1" />
        <span>Due: {formattedDueDate}</span>
      </div>
      
      <div className="flex justify-end space-x-2 mt-auto">
        <Button 
          variant="outline" 
          size="sm" 
          leftIcon={<Edit size={14} />}
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          size="sm" 
          leftIcon={<Trash2 size={14} />}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;