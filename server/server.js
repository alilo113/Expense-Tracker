const express = require("express");
const mongoose = require("mongoose")
const user = require("./module/user")
const bcrypt = require("bcrypt")
const cors = require("cors")
const app = express(); // Create an instance of the Express application
const port = 3000;

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/expenseTrackerUsers")
.then(() => console.log("Database connected"))
.catch((error) => console.log(error))

app.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(200).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create user" });
    }
});

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});