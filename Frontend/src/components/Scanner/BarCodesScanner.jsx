import React, { useState } from 'react';
import QrScanner from 'react-qr-barcode-scanner';

const BarcodeScanner = ({ onScan }) => {
  const [data, setData] = useState(null);

  const handleScan = (result) => {
    if (result && result.text !== data) {
      setData(result.text);
      onScan(result.text);
    }
  };

  return (
    <div>
      <QrScanner
        onUpdate={(err, result) => {
          if (result) handleScan(result);
        }}
        style={{ width: '100%' }}
      />
      <p>Scanned Code: {data}</p>
    </div>
  );
};

export default BarcodeScanner;