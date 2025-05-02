import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick
}) => {
  const hoverClass = hover ? 'hover:shadow-card-hover cursor-pointer' : '';
  const clickClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-card p-6 transition-all duration-200 ${hoverClass} ${clickClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;