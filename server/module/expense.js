const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "user",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    expense: {
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const expense = mongoose.model("expense", expenseSchema)
mongoose.exports = expense