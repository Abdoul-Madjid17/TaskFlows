import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from '../ui/Button';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showBackButton = false,
  title
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Don't show back button on main pages
  const shouldShowBackButton = showBackButton && 
    !['/dashboard', '/', '/login', '/register'].includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {(shouldShowBackButton || title) && (
            <div className="flex items-center mb-6">
              {shouldShowBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  leftIcon={<ArrowLeft size={16} />}
                  className="mr-4"
                >
                  Back
                </Button>
              )}
              
              {title && (
                <h1 className="text-2xl font-heading font-bold text-gray-900">{title}</h1>
              )}
            </div>
          )}
          
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;