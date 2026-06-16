import React from 'react';
import Header from './Header';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;