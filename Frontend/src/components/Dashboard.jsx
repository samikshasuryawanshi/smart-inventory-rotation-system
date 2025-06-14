import React from 'react';
import BarcodeScanner from './Scanner/BarCodesScanner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const handleProductScan = (scannedData) => {
    console.log("Scanned Product Code:", scannedData);
  };

  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <nav>
        <Link to="/add-product">Add Product</Link> | 
        <Link to="/products">View Products</Link> | 
        <Link to="/reports">Reports</Link>
      </nav>
      <BarcodeScanner onScan={handleProductScan} />
    </div>
  );
};

export default Dashboard;