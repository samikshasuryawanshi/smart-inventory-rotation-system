import React, { useState } from 'react';
import { format, addDays, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

// Initial empty product list
const ProductList = ({ scannedProducts = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white px-6 py-8 flex flex-col items-center relative">
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-6 p-2 rounded-full bg-zinc-700 hover:bg-zinc-600 transition"
        title="Go to Dashboard"
      >
        <LayoutDashboard className="w-6 h-6 text-white" />
      </button>

      <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
        Inventory Product List
      </h2>

      {scannedProducts.length === 0 ? (
        <div className="text-gray-400 text-lg">No Products Scanned Yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {scannedProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-zinc-800 bg-opacity-50 border border-zinc-700 shadow-lg backdrop-blur-sm transition transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {product.imageUrl && (
                  <img src={product.imageUrl} alt="product" className="w-32 h-32 mx-auto mb-2 rounded-lg" />
                )}

                <p className="text-sm text-gray-300 mb-2"><strong>Brand:</strong> {product.brand}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>Batch No:</strong> {product.batchNo}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>MRP:</strong> ₹ {product.mrp}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>Manufacture:</strong> {format(parseISO(product.manufactureDate), 'dd MMM yyyy')}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>Expiry:</strong> {format(parseISO(product.expiryDate), 'dd MMM yyyy')}</p>
                <p className="text-sm text-gray-400"><strong>Scanned:</strong> {format(parseISO(product.scannedAt), 'dd MMM yyyy hh:mm a')}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
