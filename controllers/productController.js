import Product from '../models/product.js';

const productController = {
  addProduct: async (req, res) => {

    const { name, description, price, stock, userId } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      userId,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' ,product:newProduct});

  },

  getAllProducts: async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ message: "success", products });
  },


};

export default productController;
