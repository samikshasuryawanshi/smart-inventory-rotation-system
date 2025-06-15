import React from 'react';

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-400">
        No products scanned yet.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 text-cyan-400">Scanned Products</h3>
      <div className="grid grid-cols md:grid-cols gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-lg p-4 shadow-lg flex flex-row items-center"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-contain mb-6"
              />
            )}
            <div
            key={index}
            className="bg-[#1e1e1e] rounded-lg p-4 shadow-lg flex flex-col items-start"
          >
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>MRP:</strong> {product.mrp}</p>
            <p><strong>Barcode:</strong> {product.barcode}</p>
            <p><strong>Scanned At:</strong> {product.scannedAt}</p>
          </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
