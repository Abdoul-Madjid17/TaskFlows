import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { PlusCircle, CheckCircle, Clock, AlertTriangle, BarChart2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TaskCard from '../components/tasks/TaskCard';
import Loader from '../components/ui/Loader';
import authStore from '../store/authStore';
import taskStore from '../store/taskStore';
import categoryStore from '../store/categoryStore';
import { Task } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = authStore();
  const { tasks, isLoading: tasksLoading, fetchTasks, updateTask, deleteTask } = taskStore();
  const { categories, fetchCategories } = categoryStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchTasks();
    fetchCategories();
  }, [isAuthenticated, navigate, fetchTasks, fetchCategories]);
  
  const handleEditTask = (task: Task) => {
    navigate(`/tasks/edit/${task.id}`);
  };
  
  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };
  
  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  
  // Get tasks due soon (next 3 days)
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);
  
  const tasksDueSoon = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= threeDaysFromNow && task.status !== 'done';
  });
  
  // Get high priority tasks
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && task.status !== 'done');
  
  // Get recently completed tasks
  const recentlyCompletedTasks = tasks
    .filter(task => task.status === 'done')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);
  
  if (tasksLoading) {
    return (
      <Layout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Dashboard">
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name || 'User'}
        </h2>
        <p className="text-gray-600">
          Here's an overview of your tasks and progress
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary-50 border border-primary-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-700 font-medium">Total Tasks</p>
              <h3 className="text-3xl font-bold text-primary-900 mt-2">{totalTasks}</h3>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-green-50 border border-green-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-700 font-medium">Completed</p>
              <h3 className="text-3xl font-bold text-green-900 mt-2">{completedTasks}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-yellow-50 border border-yellow-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-yellow-700 font-medium">In Progress</p>
              <h3 className="text-3xl font-bold text-yellow-900 mt-2">{inProgressTasks}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-red-50 border border-red-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-red-700 font-medium">To Do</p>
              <h3 className="text-3xl font-bold text-red-900 mt-2">{todoTasks}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Tasks due soon */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Tasks Due Soon</h3>
          <Button 
            variant="primary" 
            size="sm" 
            leftIcon={<PlusCircle size={16} />}
            onClick={() => navigate('/tasks/new')}
          >
            New Task
          </Button>
        </div>
        
        {tasksDueSoon.length === 0 ? (
          <Card>
            <p className="text-gray-600 text-center py-4">No tasks due soon</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasksDueSoon.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* High priority tasks */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">High Priority Tasks</h3>
        
        {highPriorityTasks.length === 0 ? (
          <Card>
            <p className="text-gray-600 text-center py-4">No high priority tasks</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highPriorityTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Recently completed tasks */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recently Completed</h3>
        
        {recentlyCompletedTasks.length === 0 ? (
          <Card>
            <p className="text-gray-600 text-center py-4">No completed tasks yet</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyCompletedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;