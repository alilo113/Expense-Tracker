const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const user = require("./module/user");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken")
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ETDB")
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ username, email, password: hashedPassword });
        console.log(newUser)
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    // Log-in route
    app.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
    
            const userExist = await user.findOne({ email });
    
            if (!userExist) {
                return res.status(401).json({ message: "Wrong email or password" });
            }
    
            // Check if password matches
            const match = await bcrypt.compare(password, userExist.password);
    
            if (!match) {
                return res.status(401).json({ message: "Wrong email or password" });
            }
    
            // Generate token
            const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            // Send response
            return res.status(200).json({
                username: userExist.username,
                userID: userExist._id.toString(),
                token
            });
            
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
    
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});