import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  barcode: { type: String },
  qrCode: { type: String },
  discounted: { type: Boolean, default: false },
  discountPercent: { type: Number, default: 0 },
  shelfLifeDays: { type: Number },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
