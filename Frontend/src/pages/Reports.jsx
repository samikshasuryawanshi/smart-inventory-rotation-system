import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockData = [
  { category: 'Dairy', expired: 5, remaining: 20 },
  { category: 'Fruits', expired: 3, remaining: 12 },
  { category: 'Bakery', expired: 4, remaining: 8 },
  { category: 'Meat', expired: 2, remaining: 15 },
];

const Reports = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Reports & Analytics
      </h2>

      <p className="text-gray-300 mb-8 text-center max-w-xl">
        Visual insights and analytics about product expiry and inventory rotation.
      </p>

      <div className="w-full max-w-4xl bg-zinc-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Expiry Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
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
