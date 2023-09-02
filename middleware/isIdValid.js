import mongoose from "mongoose";

const isIdValid = (req, res, next) => {

    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID"
        })
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    }

}


export default isIdValid;