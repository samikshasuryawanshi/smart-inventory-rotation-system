import React, { useEffect, useState } from 'react';
import BarcodeScanner from '../components/Scanner/BarCodesScanner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Navbar from './Navbar';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scannedProduct, setScannedProduct] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleProductScan = (scannedData) => {
    console.log('✅ Scanned Product Code:', scannedData);

    // For demonstration, you could later fetch this code's data from Firebase
    const mockProduct = {
      code: scannedData,
      name: 'Sample Product',
      category: 'Groceries',
      expiryDate: '2025-12-31',
    };

    setScannedProduct(mockProduct);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center px-4">
      <Navbar />

      {user && (
        <>
          {/* Logout and User Info */}
          <div className="relative w-full max-w-5xl mx-auto">
            <button
              onClick={handleLogout}
              className="fixed top-5 right-4 mt-4 mr-4 p-2 bg-red-600 hover:bg-red-700 rounded-full transition"
              title="Logout"
            >
              <LogOut size={20} className="text-white" />
            </button>

            <div className="mb-6 text-center mt-12">
              <img
                src={user.photoURL || 'https://api.dicebear.com/7.x/identicon/svg?seed=user'}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white object-cover"
              />
              <p className="text-lg text-gray-300">
                Welcome, <span className="font-semibold text-white">{user.displayName || user.email}</span> 👋
              </p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Scanner Section */}
          <div className="w-full max-w-2xl p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Scan Product Barcode / QR</h2>

            {/* Live camera + upload scanner */}
            <BarcodeScanner onScan={handleProductScan} />

            {/* Display scanned product */}
           {scannedProduct && (
            <div className="mt-6 p-4 bg-zinc-700 rounded-xl border border-zinc-600 flex flex-col gap-4">
              {/* Product Image */}
              <img
                src={scannedProduct.imageUrl || 'https://via.placeholder.com/120x120?text=No+Image'}
                alt={scannedProduct.name}
                className="w-32 h-32 rounded-lg object-cover border border-gray-500"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Scanned Product Details:</h3>
                <p><strong>Code:</strong> {scannedProduct.code}</p>
                <p><strong>Name:</strong> {scannedProduct.name}</p>
                <p><strong>Category:</strong> {scannedProduct.category}</p>
                <p><strong>Expiry:</strong> {scannedProduct.expiryDate}</p>
                <p><strong>Price:</strong> ₹{scannedProduct.price}</p>
                <p><strong>Stock:</strong> {scannedProduct.stock} units</p>
                <p><strong>Manufacturer:</strong> {scannedProduct.manufacturer}</p>
              </div>
            </div>
          )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
