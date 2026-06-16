import React from 'react';

const Button = ({ children, variant = 'primary', loading, ...props }) => {
  const baseClass = "px-4 py-2 rounded-lg font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  
  return (
    <button className={`${baseClass} ${variants[variant]} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading} {...props}>
      {loading ? <div className="spinner-small mx-auto"></div> : children}
    </button>
  );
};

export default Button;