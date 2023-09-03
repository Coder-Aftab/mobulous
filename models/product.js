import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { required: true, type: String },
  description: { required: true, type: String },
  price: { required: true, type: String },
  option: { type: String, default: 'no' }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
