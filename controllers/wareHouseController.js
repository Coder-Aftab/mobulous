import WareHouse from "../models/warehouse.js";
import { CustomError } from "../utils/utils.js";

const wareHouseController = {

    create: async (req, res) => {

        const { name, location } = req.body;

        if (!name || !location) {
            throw new CustomError('Please provide name and location', 400);
        }

        // add new wareHouse to the list
        const wareHouse = new WareHouse({
            name,
            location
        });

        wareHouse.save();


        res.json({ message: "success", wareHouse });

    },
    update: async (req, res) => {
        const { wareHouseId, productId } = req.params;
        const { stock } = req.body;
        if (!wareHouseId || !productId) {
            throw new CustomError('Please provide wareHouseId and productId', 400);
        }

        const newStock = stock ? parseInt(stock) : 0;

        const warehouse = await WareHouse.findOneAndUpdate(
            {
                _id: wareHouseId,
                'products.productId': productId
            },
            {
                $inc: { 'products.$.stock': newStock }
            },
            { new: true }
        );

        if (!warehouse) {
            // Product not found in the warehouse, add a new product
            const updatedWarehouse = await WareHouse.findByIdAndUpdate(
                wareHouseId,
                {
                    $push: { products: { productId, stock: newStock } }
                },
                { new: true }
            );

            res.json({ message: "Product added to warehouse", warehouse: updatedWarehouse });
        } else {
            res.json({ message: "Product stock updated in warehouse", warehouse });
        }
    }

}



export default wareHouseController;