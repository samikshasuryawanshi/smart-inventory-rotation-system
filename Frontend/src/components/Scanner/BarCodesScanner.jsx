import React, { useState, useRef } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { BrowserMultiFormatReader } from '@zxing/browser';

const BarcodeScanner = ({ onScan }) => {
  const [data, setData] = useState(null);
  const [imageResult, setImageResult] = useState(null);
  const inputRef = useRef(null);

  const handleScan = (result) => {
    if (result && result.text && result.text !== data) {
      setData(result.text);
      onScan(result.text);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const codeReader = new BrowserMultiFormatReader();

    try {
      const result = await codeReader.decodeFromImageUrl(imageUrl);
      if (result?.text) {
        setImageResult(result.text);
        onScan(result.text);
      }
    } catch (err) {
      console.error("Decoding failed", err);
      setImageResult("Decoding failed");
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border-2 border-zinc-800 rounded-2xl shadow-md">
      <div className="aspect-w-4 aspect-h-3 bg-zinc-900 rounded overflow-hidden mb-4">
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) handleScan(result);
          }}
          width={500}
          height={400}
        />
      </div>

      <div className="text-white text-center mb-4">
        <p>Live Scan Result: <span className="font-mono">{data || 'None'}</span></p>
        <p>Image Scan Result: <span className="font-mono">{imageResult || 'None'}</span></p>
      </div>

      <div className="text-center">
        <button
          className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600"
          onClick={() => inputRef.current.click()}
        >
          Upload Image for Scan
        </button>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default BarcodeScanner;
