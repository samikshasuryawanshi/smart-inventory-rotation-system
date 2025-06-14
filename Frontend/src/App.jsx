import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm';
import Login from './pages/Login';
import Reports from './pages/Reports';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-product" element={<ProductForm />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
};

export default App;