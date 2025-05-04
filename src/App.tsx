import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import CategoryList from './pages/CategoryList';
import CategoryForm from './pages/CategoryForm';
import NotFound from './pages/NotFound';
import authStore from './store/authStore';

function App() {
  const { isAuthenticated, user } = authStore();
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // This would update the auth store with the stored user
        // In a real app, we would validate the token with the backend
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tasks" 
          element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tasks/new" 
          element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tasks/edit/:id" 
          element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/categories" 
          element={isAuthenticated ? <CategoryList /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/categories/new" 
          element={isAuthenticated ? <CategoryForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/categories/edit/:id" 
          element={isAuthenticated ? <CategoryForm /> : <Navigate to="/login" />} 
        />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;