import React from 'react';
import BarcodeScanner from '../components/Scanner/BarCodesScanner';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  const handleProductScan = (scannedData) => {
    console.log('Scanned Product Code:', scannedData);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center px-4 py-15">

      <Navbar />

      {user?.name && (
        <p className="mb-6 text-lg text-gray-300">
          Welcome, <span className="font-semibold text-white">{user.name}</span> 👋
        </p>
      )}


      <div className="w-full max-w-2xl bg-zinc-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Scan Product Barcode / QR</h2>
        <BarcodeScanner onScan={handleProductScan} />
      </div>
    </div>
  );
};

export default Dashboard;