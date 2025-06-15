import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import axios from 'axios';
import ProductList from '../ProductList/ProductList';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [scannedCodes, setScannedCodes] = useState(new Set());
  const [status, setStatus] = useState('');
  const [productList, setProductList] = useState([]);

  const fetchProductDetails = async (barcode) => {
    setStatus('Fetching product details...');
    try {
      const response = await axios.get(
        `/api/v3/products?barcode=${barcode}&formatted=y&key=1s4jnf4pbb4pf7p61nyta3w6i2qkz7`
      );

      if (response.data.products?.length > 0) {
        const product = response.data.products[0];
        const extractedData = {
          name: product.product_name || product.title || 'N/A',
          brand: product.brand || 'N/A',
          mrp: product.stores?.[0]?.price || 'N/A',
          manufacture_date: product.manufacturer_date || 'N/A',
          expiry_date: product.expiry_date || 'N/A',
          barcode,
          image: product.images?.[0] || '',
          scannedAt: new Date().toLocaleString(),
        };

        setProductList((prev) => [extractedData, ...prev]);
        setStatus('✅ Product found');
      } else {
        setStatus('❌ Product not found');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ API error');
    }
  };

  const handleScanResult = useCallback(
    (code) => {
      if (!scannedCodes.has(code)) {
        setScannedCodes((prev) => new Set(prev).add(code));
        fetchProductDetails(code);
      } else {
        setStatus('Barcode already scanned');
      }
    },
    [scannedCodes]
  );

  useEffect(() => {
    let active = true;

    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        if (devices.length === 0) {
          setStatus('❌ No camera devices found.');
          return;
        }

        const selectedDeviceId = devices[0]?.deviceId;

        codeReader.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result && active) {
              const code = result.getText();
              handleScanResult(code);
            }
          }
        );
      } catch (error) {
        console.error('Error accessing camera:', error);
        setStatus('❌ Camera error');
      }
    };

    startScanner();

    return () => {
      try {
        codeReader.current.stopContinuousDecode();
      } catch (err) {
        console.warn('Scanner not running:', err);
      }
    };
  }, [handleScanResult]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      try {
        const result = await codeReader.current.decodeFromImageElement(img);
        const code = result.getText();
        handleScanResult(code);
      } catch (error) {
        console.error('Failed to decode image', error);
        setStatus('❌ Failed to decode uploaded image');
      }
    };
  };

  return (
    <div className="min-h-screen text-white">

      <div className="flex flex-col md:flex-col gap-8 justify-center items-center">
        <div className="bg-[#1e1e1e] p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl mb-4">Live Camera</h2>
          <video ref={videoRef} className="rounded-lg w-full" />
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl mb-4">Upload Image</h2>
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full text-sm text-gray-400 
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-500 file:text-white
                hover:file:bg-cyan-600"
            />
          </label>
        </div>
      </div>

      <p className="text-center mt-6 font-semibold text-cyan-400">{status}</p>

      <ProductList products={productList} />
    </div>
  );
};

export default BarcodeScanner;
