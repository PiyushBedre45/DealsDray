import adminModel from '../models/admin.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.json({ status: false, message: "Admin Does not exist" })
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.json({ status: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: admin._id }, 'random#secret')
        res.status(201).json({ status: true, message: "Admin Login Succesfull", token });

    } catch (error) {
        res.json({ error: error })
        console.log("login error => ", error);
    }
}



export default loginAdmin;