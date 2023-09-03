import Product from '../models/product.js';
import WareHouse from '../models/warehouse.js';
import { calculateDistance } from '../utils/utils.js';

const productController = {
  addProduct: async (req, res) => {

    const { name, description, price, stock, userId, wareHouseId } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      userId,
      associatedWareHouse: wareHouseId
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });

  },

  getAllProducts: async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ message: "success", products });
  },
  filteredProducts: async (req, res) => {
    const { lat, lng } = req.query;

    const convertedLat = parseFloat(lat);
    const convertedLng = parseFloat(lng);

    const radiusInKilometers = 10;

    const warehouses = await WareHouse.find();


    const productList = new Set();

    warehouses.forEach((warehouse) => {
      if (warehouse.location.lat && warehouse.location.lng) {
        const distance = calculateDistance(parseFloat(warehouse.location.lat), parseFloat(warehouse.location.lng), convertedLat, convertedLng)
        if (distance <= 10) {
          warehouse.products.forEach(product => {
            if (product.stock > 0) {
              productList.add(product.productId);
            }
          })
        }
      }

    })

    const pd=productList.values()
    const products = await Product.find({ $or: [{ productId: { $in: productList } }] });

    res.status(200).json({ message: "success", products });

  }
};

export default productController;
