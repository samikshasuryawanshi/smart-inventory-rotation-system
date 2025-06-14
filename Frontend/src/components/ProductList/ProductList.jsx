import React from 'react';
import { estimateShelfLifeDays } from '../../services/shelfLifeUtils';

const products = [
  { name: 'Milk', category: 'dairy' },
  { name: 'Banana', category: 'fruits' },
];

const ProductList = () => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - Shelf Life: {estimateShelfLifeDays(product.category)} days
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;