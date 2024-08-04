import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Main({ userProfile }) {
    const [category, setCategory] = useState("");
    const [expense, setExpense] = useState("");
    const [amount, setAmount] = useState("");
    const [expenses, setExpenses] = useState([]);

    async function handleNewExpense(e) {
        e.preventDefault();
        
        try {
            const userID = localStorage.getItem("userID");
            const token = localStorage.getItem('token');

            console.log("Retrieved Token:", token); // Check the token value

            const res = await fetch("http://localhost:3000/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    user: userID, 
                    expense: expense, 
                    category: category, 
                    amount: parseFloat(amount) // Ensure amount is a number
                }),
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Response Error:", errorData); // Log error response
                throw new Error(`Network response was not ok: ${errorData.message || "Unknown error"}`);
            }
            
            const data = await res.json();
            setExpenses((prevExpenses) => {
                const updatedExpenses = [...prevExpenses, data];
                console.log("Updated Expenses:", updatedExpenses); // Log the updated expenses
                return updatedExpenses;
            });
        } catch (error) {
            console.error("Error submitting the expense:", error.message);
        }
    }

    return (
        <main className="flex-grow flex flex-col p-8 min-h-screen">
            {userProfile ? (
                <>
                    <form onSubmit={handleNewExpense} className="w-full max-w-4xl bg-white shadow-md rounded p-6 flex items-center">
                        {/* Input Fields */}
                        <div className="flex-grow flex space-x-4">
                            <input
                                type="text"
                                placeholder="Category"
                                className="border border-gray-300 p-2 rounded w-full"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Expense"
                                className="border border-gray-300 p-2 rounded w-full"
                                value={expense}
                                onChange={(e) => setExpense(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="border border-gray-300 p-2 rounded w-full"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
                            >
                                Add Expense
                            </button>
                        </div>

                        {/* Vertical Line */}
                        <div className="border-l border-gray-300 h-12 mx-4"></div>

                        {/* Search Bar */}
                        <div className="flex-shrink-0">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border border-gray-300 p-2 rounded"
                            />
                        </div>
                    </form>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Category</th>
                                <th className="border-b p-2">Expense</th>
                                <th className="border-b p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense._id}>
                                    <td className="border-b p-2">{expense.category}</td>
                                    <td className="border-b p-2">{expense.expense}</td>
                                    <td className="border-b p-2">{expense.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="flex-grow flex justify-center items-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4 text-teal-700">Welcome to PennyPilot</h2>
                        <p className="text-lg mb-8 text-gray-700">
                            Take control of your finances and navigate your budget with ease.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link to="/login" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}