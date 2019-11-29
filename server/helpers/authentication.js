import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Authenticate {

    static generateToken(email, id, isAdmin) {
        return jwt.sign({ email, id, isAdmin }, process.env.SECRETKEY, { expiresIn: "3h" });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.SECRETKEY);
    }

    static encryptPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static verifyPassword(plainPassword, encryptedPassword) {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    }
}

export default Authenticate;