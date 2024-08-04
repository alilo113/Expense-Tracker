const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Assuming `user` is an ObjectId referencing the `user` model
        ref: "user",  // Reference to the `user` model
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
});

const Expense = mongoose.model("Expense", expenseSchema);  
module.exports = Expense;  