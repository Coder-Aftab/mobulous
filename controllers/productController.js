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
  getProductsBasedOnLocation: async (req, res) => {
    const { lat, lng } = req.query;

    // convert lat and lng to decimal
    const convertedLat = parseFloat(lat);
    const convertedLng = parseFloat(lng);


    // now find all the warehouse
    const warehouses = await WareHouse.find().populate({ path: "products", populate: "productId" });

    //create products list
    const productList = new Set();

    // now find all the products in the warehouses that are within 10 km of the user's location
    warehouses.forEach((warehouse) => {
      if (warehouse.location.lat && warehouse.location.lng) {
        const distance = calculateDistance(parseFloat(warehouse.location.lat), parseFloat(warehouse.location.lng), convertedLat, convertedLng)
        if (distance <= 10) {
          warehouse.products.forEach(product => {
            if (product.stock > 0) {
              productList.add(product);
            }
          })
        }
      }

    })


    res.status(200).json({ message: "success", products: [...productList] });

  }
};

export default productController;
