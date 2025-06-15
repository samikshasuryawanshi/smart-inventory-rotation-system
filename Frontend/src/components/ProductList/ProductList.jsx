import React from 'react';
import { estimateShelfLifeDays } from '../../services/shelfLifeUtils';
import { format, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const products = [
  { name: 'Milk', category: 'dairy' },
  { name: 'Banana', category: 'fruits' },
  { name: 'Spinach', category: 'vegetables' },
  { name: 'Bread', category: 'bakery' },
];

const getEstimatedExpiryDate = (category) => {
  const days = estimateShelfLifeDays(category);
  const estimated = addDays(new Date(), days);
  return format(estimated, 'dd MMM yyyy');
};

const ProductList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-8 flex flex-col items-center relative">
      {/* Dashboard Navigation Icon */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-6 p-2 rounded-full cursor-pointer bg-zinc-700 hover:bg-zinc-600 transition"
        title="Go to Dashboard"
      >
        <LayoutDashboard className="w-6 h-6 text-white" />
      </button>

      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Estimated Product Shelf Lives
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {products.map((product, index) => {
          const shelfLife = estimateShelfLifeDays(product.category);
          const isShortLife = shelfLife <= 3;

          return (
            <div
              key={index}
              className={`p-4 rounded-xl shadow-md border-2 ${
                isShortLife ? 'border-red-500' : 'border-zinc-700'
              } bg-zinc-800 hover:shadow-lg transition`}
            >
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="mb-1 text-sm">
                <span className="font-medium text-gray-400">Category:</span>{' '}
                <span className="uppercase text-blue-400 tracking-wide">{product.category}</span>
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium text-gray-400">Shelf Life:</span>{' '}
                {shelfLife} days
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-400">Est. Expiry:</span>{' '}
                {getEstimatedExpiryDate(product.category)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
