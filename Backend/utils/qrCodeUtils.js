import QRCode from 'qrcode';

export const generateQRCode = async (data) => {
  try {
    const qr = await QRCode.toDataURL(data);
    return qr;
  } catch (err) {
    throw new Error("QR generation failed");
  }
};
