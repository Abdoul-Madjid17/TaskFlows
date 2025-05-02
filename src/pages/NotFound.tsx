import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-100 p-4 rounded-full mb-6">
          <AlertTriangle className="h-16 w-16 text-red-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button leftIcon={<Home size={18} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;