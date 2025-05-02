import { create } from 'zustand';
import { AuthState, User } from '../types';

// This is a mock implementation for now
// In a real app, this would connect to Azure Static Web Apps Authentication
const authStore = create<AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock login - in real app, this would call the authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const user: User = {
        id: '1',
        name: 'Demo User',
        email,
        avatar: 'https://i.pravatar.cc/150?u=demo',
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ error: 'Invalid credentials', isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock registration - in real app, this would call the registration API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const user: User = {
        id: '1',
        name,
        email,
        avatar: 'https://i.pravatar.cc/150?u=demo',
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
    }
  },
}));

export default authStore;