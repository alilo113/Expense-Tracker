const express = require("express");
const mongoose = require("mongoose");
const User = require("./module/user"); // Ensure this path is correct
const bcrypt = require("bcrypt");
const auth = require("./middleware/auth")
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const app = express(); 
const port = 3000;
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/expenseTrackerUsers")
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));

app.post("/sign-up", async (req, res) => {
    const {username, email, password} = req.body;

    try {    
        const accountExist = await user.findOne({username})
        if(accountExist){
            return res.status(400).json({error: "This account exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new user({username: username, email: email, password: hashedPassword})
        console.log(newUser)
        await newUser.save()
        res.status(200).json({message: "Account created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

app.post("/log-in", async (req, res) => {
    try {
        const {username, password} = req.body

        const userExist = await user.findOne({username})
        if(userExist){
            await bcrypt.compare(password, userExist.password)
            const token = jwt.sign({ id: userExist._id}, secretKey, { expiresIn: "1h" });

            res.json({
                username: userExist.username,
                userID: userExist._id.toString(),
                token
            });
        }else{
            res.status(401).json({ message: "Invalid credentials"});
        }
    } catch (error) {
        console.error("Login erro:", error)
        res.status(500).json({ message: "Internal servar Error"})
    }
})

app.get("/profile", auth, async (req, res) => {
    try {
        console.log('Fetching profile for user ID:', req.user._id);

        const user = await User.findById(req.user._id); // Use `User` with uppercase 'U'
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: "Error fetching profile", error });
    }
});

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});