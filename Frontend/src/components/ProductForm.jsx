import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted', { name, expiry });
    setName('');
    setExpiry('');
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center items-center text-white px-4 py-8 relative">
      {/* Dashboard Icon */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-6 p-2 rounded-full cursor-pointer bg-zinc-700 hover:bg-zinc-600 transition"
        title="Go to Dashboard"
      >
        <LayoutDashboard className="w-6 h-6 text-white" />
      </button>

      <div className="w-full max-w-md bg-zinc-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 py-2 rounded font-semibold hover:opacity-90 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
