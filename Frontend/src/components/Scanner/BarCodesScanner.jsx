import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import axios from 'axios';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [scannedCode, setScannedCode] = useState('');
  const [productData, setProductData] = useState(null);
  const [status, setStatus] = useState('');

  const fetchProductDetails = async (barcode) => {
    setStatus('Fetching product details...');
    try {
      const response = await axios.get(
        `https://corsproxy.io/?https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=1s4jnf4pbb4pf7p61nyta3w6i2qkz7`
      );

      if (response.data.products.length > 0) {
        setProductData(response.data.products[0]);
        setStatus('✅ Product found');
      } else {
        setProductData(null);
        setStatus('❌ Product not found');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ API error');
    }
  };

  useEffect(() => {
    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        if (devices.length === 0) {
          setStatus('❌ No camera devices found.');
          return;
        }

        const selectedDeviceId = devices[0]?.deviceId;

        codeReader.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
          if (result) {
            const code = result.getText();
            if (code !== scannedCode) {
              setScannedCode(code);
              fetchProductDetails(code);
            }
          }
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
        setStatus('❌ Camera error');
      }
    };

    startScanner();

    return () => {
      try {
        codeReader.current.reset();
      } catch (err) {
        console.error('Reset decoding error:', err);
      }
    };
  }, [scannedCode]);

  // 👉 Handle file upload scanning
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      try {
        const result = await codeReader.current.decodeFromImageElement(img);
        const code = result.getText();
        setScannedCode(code);
        fetchProductDetails(code);
      } catch (error) {
        console.error('Failed to decode image', error);
        setStatus('❌ Failed to decode uploaded image');
      }
    };
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>

      <div>
        <h3>Live Camera Scanner:</h3>
        <video ref={videoRef} style={{ width: '100%' }} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Or Upload Barcode Image:</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>

      <p>Status: {status}</p>
      {productData && (
        <div>
          <h3>Product Details:</h3>
          <pre>{JSON.stringify(productData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
