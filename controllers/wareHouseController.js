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
        const product = { productId, stock: newStock };
        const wareHouse = await WareHouse.findByIdAndUpdate(wareHouseId, { $push: { products: product } }, { $new: true });

        res.json({ message: "success", wareHouse });

    }

}



export default wareHouseController;