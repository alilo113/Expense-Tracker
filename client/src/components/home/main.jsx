import React from "react";
import { Link } from "react-router-dom";

export function Main(){
    return(
    <main className="flex-grow flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">Welcome to PennyPilot</h2>
        <p className="text-lg mb-8 text-gray-700">
            Take control of your finances and navigate your budget with ease.
        </p>
        <div className="flex space-x-4">
            <Link to="/login" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700">
                Login
            </Link>
            <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700">
                Sign Up
            </Link>
        </div>
    </main>
    )
}