import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  status: {
    type: String,
    enum: ['new', 'accepted', 'rejected'],
    default: 'new',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
