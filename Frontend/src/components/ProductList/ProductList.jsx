import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h3>All Products</h3>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.name} — Expires: {new Date(prod.expiryDate).toLocaleDateString()} — 
            Discount: {prod.discountPercent}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
