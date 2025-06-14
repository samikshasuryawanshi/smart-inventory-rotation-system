import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const BarcodeScanner = ({ onScan }) => {
  const [data, setData] = useState(null);

  const handleScan = (result) => {
    if (result && result.text && result.text !== data) {
      setData(result.text);
      onScan(result.text);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border-2 border-zinc-800 rounded-2xl shadow-md">
      <div className="aspect-w-4 aspect-h-3 bg-zinc-900 rounded overflow-hidden">
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) handleScan(result);
          }}
          width={500}
          height={400}
        />
      </div>
      <p className="text-white mt-4 text-center">Scanned Code: <span className="font-mono">{data || 'None'}</span></p>
    </div>
  );
};

export default BarcodeScanner;