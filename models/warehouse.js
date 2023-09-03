import mongoose from 'mongoose';

const productStockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    stock: Number,
});

const wareHouseSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: {
        lat: String,
        lng: String,
    },
    products: [productStockSchema], // Array of products with stock information
});

const WareHouse = mongoose.model('WareHouse', wareHouseSchema);

export default WareHouse;
