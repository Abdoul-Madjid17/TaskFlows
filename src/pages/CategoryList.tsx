import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import CategoryCard from '../components/categories/CategoryCard';
import Loader from '../components/ui/Loader';
import authStore from '../store/authStore';
import categoryStore from '../store/categoryStore';
import { Category } from '../types';

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();
  const { categories, isLoading, fetchCategories, deleteCategory } = categoryStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchCategories();
  }, [isAuthenticated, navigate, fetchCategories]);
  
  const handleEditCategory = (category: Category) => {
    navigate(`/categories/edit/${category.id}`);
  };
  
  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  };
  
  if (isLoading) {
    return (
      <Layout title="Categories" showBackButton>
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Categories" showBackButton>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          All Categories ({categories.length})
        </h2>
        <Button 
          leftIcon={<PlusCircle size={16} />}
          onClick={() => navigate('/categories/new')}
        >
          New Category
        </Button>
      </div>
      
      {categories.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-600 mb-4">No categories found</p>
          <Button 
            variant="primary" 
            leftIcon={<PlusCircle size={16} />}
            onClick={() => navigate('/categories/new')}
          >
            Create Your First Category
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default CategoryList;