import { CustomError } from "../utils/utils.js";

const adminAuth = (req, res, next) => {

    if (req.isAdmin) {
        return next();
    }
    throw new CustomError("Access denied", 403)
};

export default adminAuth;
