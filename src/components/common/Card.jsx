import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-900 rounded-xl border border-gray-800 shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;