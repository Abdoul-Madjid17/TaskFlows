import { create } from 'zustand';
import { Task, TasksState } from '../types';

// Mock data for now - in a real app, this would fetch from the API
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft the initial project proposal for the client meeting',
    status: 'todo',
    priority: 'high',
    category: 'Work',
    dueDate: '2025-04-15T00:00:00.000Z',
    createdAt: '2025-04-01T10:00:00.000Z',
    updatedAt: '2025-04-01T10:00:00.000Z',
    userId: '1',
  },
  {
    id: '2',
    title: 'Review team presentations',
    description: 'Review and provide feedback on team presentations for the quarterly meeting',
    status: 'in-progress',
    priority: 'medium',
    category: 'Work',
    dueDate: '2025-04-10T00:00:00.000Z',
    createdAt: '2025-04-02T09:30:00.000Z',
    updatedAt: '2025-04-03T14:20:00.000Z',
    userId: '1',
  },
  {
    id: '3',
    title: 'Schedule dentist appointment',
    description: 'Call the dentist to schedule a check-up appointment',
    status: 'todo',
    priority: 'low',
    category: 'Personal',
    dueDate: '2025-04-20T00:00:00.000Z',
    createdAt: '2025-04-03T16:45:00.000Z',
    updatedAt: '2025-04-03T16:45:00.000Z',
    userId: '1',
  },
  {
    id: '4',
    title: 'Prepare for Azure certification',
    description: 'Study for the upcoming Azure certification exam',
    status: 'in-progress',
    priority: 'high',
    category: 'Learning',
    dueDate: '2025-05-01T00:00:00.000Z',
    createdAt: '2025-04-01T11:20:00.000Z',
    updatedAt: '2025-04-04T09:15:00.000Z',
    userId: '1',
  },
  {
    id: '5',
    title: 'Gym session',
    description: 'Attend the scheduled gym session',
    status: 'done',
    priority: 'medium',
    category: 'Health',
    dueDate: '2025-04-05T18:00:00.000Z',
    createdAt: '2025-04-02T08:00:00.000Z',
    updatedAt: '2025-04-05T20:00:00.000Z',
    userId: '1',
  },
];

const taskStore = create<TasksState & {
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would fetch from the backend
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ tasks: mockTasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },

  addTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newTask: Task = {
        ...task,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set(state => ({ 
        tasks: [...state.tasks, newTask],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to add task', isLoading: false });
    }
  },

  updateTask: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id 
            ? { ...task, ...updates, updatedAt: new Date().toISOString() } 
            : task
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false });
    }
  },
}));

export default taskStore;