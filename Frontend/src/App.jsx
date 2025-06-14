import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/add-product" element={<ProductForm />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
};

export default App;
