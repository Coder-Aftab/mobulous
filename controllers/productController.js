import Product from '../models/product.js';

const productController = {
  addProduct: async (req, res) => {
    try {
      const { name, description, price, stock, userId } = req.body;

      const newProduct = new Product({
        name,
        description,
        price,
        stock,
        userId,
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

};

export default productController;
