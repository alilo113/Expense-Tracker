import React from "react";
import { Link } from "react-router-dom";

export function Main({ userProfile }) {
    return (
        <main className="flex-grow flex flex-col p-8 min-h-screen">
            {userProfile ? (
                <>
                    <div className="w-full max-w-4xl bg-white shadow-md rounded p-6 flex items-center">
                        {/* Input Fields */}
                        <div className="flex-grow flex space-x-4">
                            <input
                                type="text"
                                placeholder="Category"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                placeholder="Expense"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <button
                                onClick={() => alert('Add expense functionality needs to be implemented')}
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
                    </div>
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