import { create } from 'zustand';
import { Category, CategoriesState } from '../types';

// Mock data for now - in a real app, this would fetch from the API
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Work',
    color: '#0ea5e9', // primary-500
    userId: '1',
  },
  {
    id: '2',
    name: 'Personal',
    color: '#8b5cf6', // secondary-500
    userId: '1',
  },
  {
    id: '3',
    name: 'Learning',
    color: '#10b981', // green-500
    userId: '1',
  },
  {
    id: '4',
    name: 'Health',
    color: '#ef4444', // red-500
    userId: '1',
  },
];

const categoryStore = create<CategoriesState & {
  fetchCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would fetch from the backend
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ categories: mockCategories, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch categories', isLoading: false });
    }
  },

  addCategory: async (category) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCategory: Category = {
        ...category,
        id: Math.random().toString(36).substring(2, 9),
      };
      
      set(state => ({ 
        categories: [...state.categories, newCategory],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to add category', isLoading: false });
    }
  },

  updateCategory: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        categories: state.categories.map(category => 
          category.id === id 
            ? { ...category, ...updates } 
            : category
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update category', isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - in real app, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        categories: state.categories.filter(category => category.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete category', isLoading: false });
    }
  },
}));

export default categoryStore;