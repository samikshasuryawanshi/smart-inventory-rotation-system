import React, { useEffect } from 'react';
import BarcodeScanner from '../components/Scanner/BarCodesScanner';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Navbar from './Navbar';
import { LogOut } from 'lucide-react';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect if not logged in
    }
  }, [user, navigate]);

  const handleProductScan = (scannedData) => {
    console.log('Scanned Product Code:', scannedData);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center px-4 ">
      <Navbar />

      {user && (
        <>
          <div className="relative w-full max-w-5xl mx-auto">
            {/* Top Right Logout Button */}
            <button
              onClick={handleLogout}
              className="fixed top-5 right-4 mt-4 mr-4 p-2 bg-red-600 hover:bg-red-700 rounded-full transition"
              title="Logout"
            >
              <LogOut size={20} className="text-white" />
            </button>

            {/* User Info Section */}
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
          <div className="w-full max-w-2xl bg-zinc-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Scan Product Barcode / QR</h2>
            <BarcodeScanner onScan={handleProductScan} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
