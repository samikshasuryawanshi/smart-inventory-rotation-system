import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <>
      {/* Hamburger for small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-zinc-800 p-2 rounded-md shadow-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Background blur on sidebar open (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
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

        {/* Logout Button */}
        <div className="mt-auto pt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors w-full"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Page Content Wrapper */}
      <div className="md:ml-64 pt-6 px-4 sm:px-6 md:px-8 transition-all duration-300">
        {/* Routed content will appear here */}
      </div>
    </>
  );
};

export default Navbar;
