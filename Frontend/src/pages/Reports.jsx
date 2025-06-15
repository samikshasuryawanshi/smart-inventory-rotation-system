import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const Reports = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const categoryMap = {};

        snapshot.forEach(doc => {
          const product = doc.data();
          const category = product.category || 'Uncategorized';
          const expired = new Date(product.expiryDate) < new Date();

          if (!categoryMap[category]) {
            categoryMap[category] = { category, expired: 0, remaining: 0 };
          }

          if (expired) {
            categoryMap[category].expired += 1;
          } else {
            categoryMap[category].remaining += 1;
          }
        });

        setData(Object.values(categoryMap));
      } catch (error) {
        console.error('Failed to fetch report data:', error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center relative">
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-6 p-2 rounded-full cursor-pointer bg-zinc-700 hover:bg-zinc-600 transition"
        title="Go to Dashboard"
      >
        <LayoutDashboard className="w-6 h-6 text-white" />
      </button>

      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Reports & Analytics
      </h2>

      <p className="text-gray-300 mb-8 text-center max-w-xl">
        Visual insights and analytics about product expiry and inventory rotation.
      </p>

      <div className="w-full max-w-4xl bg-zinc-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Expiry Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="category" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
            <Bar dataKey="expired" fill="#EF4444" name="Expired Products" />
            <Bar dataKey="remaining" fill="#10B981" name="Remaining Products" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
