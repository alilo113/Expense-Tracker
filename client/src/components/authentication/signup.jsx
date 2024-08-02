import React from "react";

export function Signup() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Sign Up</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <a href="/login" className="text-teal-500 hover:underline">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}