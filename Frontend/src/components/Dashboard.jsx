import React from 'react';
import BarcodeScanner from '../components/Scanner/BarCodesScanner';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';  // ✅ you already fixed your useAuth
import Navbar from './Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  const handleProductScan = (scannedData) => {
    console.log('Scanned Product Code:', scannedData);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center px-4 py-15">
      <Navbar />

      {user && (
        <div className="mb-6 text-center">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white"
            />
          )}
          <p className="text-lg text-gray-300">
            Welcome, <span className="font-semibold text-white">{user.displayName || user.email}</span> 👋
          </p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      )}

      <div className="w-full max-w-2xl bg-zinc-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Scan Product Barcode / QR</h2>
        <BarcodeScanner onScan={handleProductScan} />
      </div>
    </div>
  );
};

export default Dashboard;
