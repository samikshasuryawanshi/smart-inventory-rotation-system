import React from 'react';
import BarcodeScanner from '../components/Scanner/BarCodesScanner';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const handleProductScan = (scannedData) => {
    console.log('Scanned Product Code:', scannedData);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Smart Inventory Dashboard
      </h1>

      {user?.name && (
        <p className="mb-6 text-lg text-gray-300">
          Welcome, <span className="font-semibold text-white">{user.name}</span> 👋
        </p>
      )}

      <nav className="flex flex-wrap justify-center gap-4 mb-8">
        <Link
          to="/add-product"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition font-semibold text-white shadow-lg"
        >
          Add Product
        </Link>
        <Link
          to="/products"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition font-semibold text-white shadow-lg"
        >
          View Products
        </Link>
        <Link
          to="/reports"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition font-semibold text-white shadow-lg"
        >
          Reports
        </Link>
      </nav>

      <div className="w-full max-w-2xl bg-zinc-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Scan Product Barcode / QR</h2>
        <BarcodeScanner onScan={handleProductScan} />
      </div>
    </div>
  );
};

export default Dashboard;