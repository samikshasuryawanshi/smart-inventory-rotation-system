import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API to add product
    console.log('Product submitted', { name, expiry });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
        <input type="date" onChange={(e) => setExpiry(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ProductForm;