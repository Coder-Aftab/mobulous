import Admin from "./models/admin";
import bcrypt from "bcrypt";
/**
 * create admin user
 */



const setUp = async () => {

    // admin credentials email:123@gmail.com pwd: 123456
    const pwd = bcrypt.hashSync("123456", 10);

    const admin = await new Admin({
        email: "123@gmail.com",
        password: pwd
    }).save();


}


setUp()