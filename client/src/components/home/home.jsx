// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom"

export function Home({ username }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {username ? (
                <nav className="bg-blue-500 p-4 shadow-md">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="text-white text-2xl font-bold">Expense Navigator</div>
                        <div className="space-x-4">
                            <Link to="/log-in" className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg">{username}</Link>
                            <Link to="/sign-up" className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg">Log out</Link>
                            </div>
                        </div>
                </nav>
            ) : (
            <nav className="bg-blue-500 p-4 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">Expense Navigator</div>
                    <div className="space-x-4">
                        <Link to="/log-in" className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg">Login</Link>
                        <Link to="/sign-up" className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg">Sign Up</Link>
                    </div>
                </div>
            </nav>
            )}

            {/* Main Welcome Section */}
            <main className="flex-grow flex items-center justify-center py-8 px-4">
                <div className="text-center bg-white p-8 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome to Expense Navigator</h1>
                    <p className="text-gray-700 mb-6">Easily track and manage your expenses with ease.</p>
                    <p className="text-gray-600">Log in or sign up to get started!</p>
                </div>
            </main>
        </div>
    );
}