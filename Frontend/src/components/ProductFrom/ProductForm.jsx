import React, { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '', quantity: 1, expiryDate: '', barcode: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/products', formData);
    navigate('/products');
  };

  return (
    <div>
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} />
        <input name="expiryDate" type="date" onChange={handleChange} />
        <input name="barcode" placeholder="Barcode" onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
