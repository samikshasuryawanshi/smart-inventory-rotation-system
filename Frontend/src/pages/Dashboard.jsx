import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <nav>
        <Link to="/add-product">Add Product</Link> | 
        <Link to="/products">View Products</Link> | 
        <Link to="/reports">Reports</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
