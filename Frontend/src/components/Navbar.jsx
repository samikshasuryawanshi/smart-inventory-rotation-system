import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Hamburger for small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-zinc-800 p-2 rounded-md shadow-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay background blur for small screens */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-zinc-900 text-white w-64 p-6 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-8 mt-15 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Smart Inventory
        </h1>
        <nav className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 hover:text-blue-400 transition-colors text-white font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/add-product"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 hover:text-blue-400 transition-colors text-white font-medium"
          >
            Add Product
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 hover:text-blue-400 transition-colors text-white font-medium"
          >
            View Products
          </Link>
          <Link
            to="/reports"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 hover:text-blue-400 transition-colors text-white font-medium"
          >
            Reports
          </Link>
        </nav>
      </aside>

      {/* Page content wrapper */}
      <div className="md:ml-64 pt-6 px-4 sm:px-6 md:px-8 transition-all duration-300">
        {/* Your routed content will be rendered here */}
      </div>
    </>
  );
};

export default Sidebar;
