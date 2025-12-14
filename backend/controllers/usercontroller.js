import UserModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
}


//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = generateToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //if email alaready present, display msg for login
        const userExists = await UserModel.findOne({ email })
        if (userExists) {
            return res.json({ success: false, message: "User already exists" })
        }
        //validating email and paassword
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = generateToken(user._id)
        res.json({ success: true, token })
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: e.msg })
    }
}

//Route for admin Login
const adminLogin = async (req, res) => {
    try{
        const {email,password} = req.body;
        if (email == process.env.ADMIN_EMAIL && password ==process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY)
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    }
    catch(e){
        res.json({success:false, message:e.message})
    }
}

export { loginUser, registerUser, adminLogin } 
