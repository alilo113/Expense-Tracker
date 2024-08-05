import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Main({ userProfile }) {
    const [category, setCategory] = useState("");
    const [expense, setExpense] = useState("");
    const [amount, setAmount] = useState("");
    const [expenses, setExpenses] = useState([]);

    function getToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return null; // Return null if no token is found
        }
        console.log("Retrieved Token:", token); // Log token to verify
        return token;
    }

    async function fetchExpenses() {
        try {
            const res = await fetch("http://localhost:3000/expenses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getToken()}`, // Ensure token is valid
                }
            });
        
            if (!res.ok) {
                throw new Error("Failed to fetch expenses");
            }
        
            const data = await res.json();
            console.log(data);
    
            // Check if data.expenses is an array
            if (!Array.isArray(data.expenses)) {
                throw new TypeError("Fetched data is not an array");
            }
        
            setExpenses(data.expenses);
        } catch (error) {
            console.error("Error fetching expenses:", error.message);
        }
    }

    useEffect(() => {
        fetchExpenses(); // Call the fetchExpenses function inside useEffect
    }, []); // Empty dependency array ensures this runs once on component mount

    async function handleNewExpense(e) {
        e.preventDefault();
        
        try {
            const userID = localStorage.getItem("userID");
            const token = getToken(); // Use the getToken function

            if (!token) {
                console.error("No token available");
                return;
            }

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
            
            // Fetch updated expenses after adding a new one
            fetchExpenses();

            setCategory("");
            setExpense("");
            setAmount(""); // Clear input fields after submission
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
                                <th className="border-b p-2 text-center">Category</th>
                                <th className="border-b p-2 text-center">Expense</th>
                                <th className="border-b p-2 text-center">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => {
                                const key = `${expense._id}-${index}`;
                                return (
                                    <tr key={key} className="min-w-full bg-white">
                                        <td className="border-b p-2 text-center">{expense.category}</td>
                                        <td className="border-b p-2 text-center">{expense.expense}</td>
                                        <td className="border-b p-2 text-center">{expense.amount} $</td>
                                    </tr>
                                );
                            })}
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