import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CategoryFormComponent from '../components/categories/CategoryForm';
import Loader from '../components/ui/Loader';
import authStore from '../store/authStore';
import categoryStore from '../store/categoryStore';
import { Category } from '../types';

const CategoryFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();
  const { categories, isLoading, addCategory, updateCategory, fetchCategories } = categoryStore();
  const [category, setCategory] = useState<Category | undefined>(undefined);
  
  const isEditMode = !!id;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchCategories();
  }, [isAuthenticated, navigate, fetchCategories]);
  
  useEffect(() => {
    if (isEditMode && categories.length > 0) {
      const foundCategory = categories.find(c => c.id === id);
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        navigate('/categories');
      }
    }
  }, [isEditMode, id, categories, navigate]);
  
  const handleSubmit = async (data: Omit<Category, 'id'>) => {
    if (isEditMode && id) {
      await updateCategory(id, data);
    } else {
      await addCategory(data);
    }
    navigate('/categories');
  };
  
  if (isLoading) {
    return (
      <Layout title={isEditMode ? 'Edit Category' : 'New Category'} showBackButton>
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      </Layout>
    );
  }
  
  if (isEditMode && !category) {
    return (
      <Layout title="Category Not Found" showBackButton>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">The category you're looking for doesn't exist or has been deleted.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={isEditMode ? 'Edit Category' : 'New Category'} showBackButton>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <CategoryFormComponent
          onSubmit={handleSubmit}
          initialData={category}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default CategoryFormPage;