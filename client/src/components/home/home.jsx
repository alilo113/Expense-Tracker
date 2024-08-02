import React from "react";

export function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="bg-teal-600 w-full py-4 text-white shadow-md">
                <h1 className="text-3xl font-bold text-center">PennyPilot</h1>
            </header>
            <main className="flex-grow flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold mb-4 text-teal-700">Welcome to PennyPilot</h2>
                <p className="text-lg mb-8 text-gray-700">
                    Take control of your finances and navigate your budget with ease.
                </p>
                <div className="flex space-x-4">
                    <a href="/login" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700">
                        Login
                    </a>
                    <a href="/signup" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700">
                        Sign Up
                    </a>
                </div>
            </main>
            <footer className="bg-gray-800 w-full py-4 text-white text-center">
                <p>&copy; 2024 PennyPilot. All rights reserved.</p>
            </footer>
        </div>
    );
}