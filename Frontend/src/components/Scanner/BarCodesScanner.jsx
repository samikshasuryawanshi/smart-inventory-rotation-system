import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const deviceId = devices[0]?.deviceId;

        await codeReader.current.decodeFromVideoDevice(
          deviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              onScan(result.getText());
            }
          }
        );
      } catch (err) {
        console.error('Camera Scanner Error:', err);
      }
    };

    startScanner();
    return () => {
      // Safely stop camera
      if (codeReader.current) {
        codeReader.current.reset?.(); // Optional chaining
      }
    };
  }, [onScan]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      try {
        const result = await codeReader.current.decodeFromImageElement(img);
        onScan(result.getText());
      } catch (err) {
        alert('Could not detect a code in the image.');
      }
    };
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} className="w-full max-h-[300px] rounded border border-gray-500" />

      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Upload Image to Scan
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default BarcodeScanner;
