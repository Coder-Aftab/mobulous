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
      res.status(201).json({ message: 'Product added successfully' });
    
  },

};

export default productController;
