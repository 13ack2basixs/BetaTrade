const FormDataModel = require('../models/FormData');

const register = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Register request received for email: ${email}`);
    try {
        console.log('Searching for existing user...');
        const user = await FormDataModel.findOne({ email: email });
        if (user) {
            console.log(`User already registered: ${email}`);
            return res.json("Already registered");
        }
        console.log('Creating new user...');
        const newUser = new FormDataModel(req.body);
        await newUser.save();
        console.log(`User registered successfully: ${email}`);
        res.json(newUser);
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json(err.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login request received for email: ${email}`);
    try {
        const user = await FormDataModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                console.log(`Login successful for email: ${email}`);
                res.json({ status: "Success", user });
            } else {
                console.log(`Wrong password for email: ${email}`);
                res.json({ status: "Wrong password" });
            }
        } else {
            console.log(`No records found for email: ${email}`);
                res.json({ status: "No records found!" });
        }
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ status: "Error", message: err.message });
    }
};

module.exports = { register, login };
