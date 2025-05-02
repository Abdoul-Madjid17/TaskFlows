import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TaskFormComponent from '../components/tasks/TaskForm';
import Loader from '../components/ui/Loader';
import authStore from '../store/authStore';
import taskStore from '../store/taskStore';
import { Task } from '../types';

const TaskFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();
  const { tasks, isLoading, addTask, updateTask, fetchTasks } = taskStore();
  const [task, setTask] = useState<Task | undefined>(undefined);
  
  const isEditMode = !!id;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchTasks();
  }, [isAuthenticated, navigate, fetchTasks]);
  
  useEffect(() => {
    if (isEditMode && tasks.length > 0) {
      const foundTask = tasks.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      } else {
        navigate('/tasks');
      }
    }
  }, [isEditMode, id, tasks, navigate]);
  
  const handleSubmit = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isEditMode && id) {
      await updateTask(id, data);
    } else {
      await addTask(data);
    }
    navigate('/tasks');
  };
  
  if (isLoading) {
    return (
      <Layout title={isEditMode ? 'Edit Task' : 'New Task'} showBackButton>
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      </Layout>
    );
  }
  
  if (isEditMode && !task) {
    return (
      <Layout title="Task Not Found" showBackButton>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">The task you're looking for doesn't exist or has been deleted.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={isEditMode ? 'Edit Task' : 'New Task'} showBackButton>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <TaskFormComponent
          onSubmit={handleSubmit}
          initialData={task}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default TaskFormPage;