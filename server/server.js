const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const user = require("./module/user");
const Expense = require("./module/expense");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth");
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
        const userEXist = await user.findOne({ username });
        if (userEXist) {
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
   
app.post("/expenses", auth, async (req, res) => {
    const { category, expense, amount, user} = req.body;
    
    if (!category || !expense || !amount || !user) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newExpense = new Expense({ category, expense, amount, user});
        console.log(newExpense)
        await newExpense.save();
        res.status(200).json({newExpense});
    } catch (error) {
        console.error("Expense creating error:", error.message);
        res.status(500).json({ message: "Failed to create expense. Try again later." });
    }
});

app.get("/expenses", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({ user: userId }); // Fetch expenses by user
        res.status(200).json({ expenses }); // Return expenses
    } catch (error) {
        console.log("Fetching error", error);
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    } 
});

app.get("/get-amount", auth, async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await Expense.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) } // Only this user's expenses
            },
            {
                $group: {
                    _id: "$category", // Group by category
                    totalAmount: { $sum: "$amount" } // Sum the amount per category
                }
            }
        ]);

        res.status(200).json({ result });
        console.log(result)
    } catch (error) {
        console.error("Aggregation error:", error);
        res.status(500).json({ message: "Aggregation failed", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});