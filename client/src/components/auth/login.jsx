import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setUserProfile }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUserProfile(storedUsername);
        }
    }, [setUserProfile]);

    async function handleLogIn(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                // Store values in localStorage
                localStorage.setItem("username", data.username);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userID", data.userID);
    
                // Log the token value received from the server
                console.log("Stored Token:", data.token); // Access the token from the `data` object
                nav("/")
                // Set user profile and clear form fields
                setUserProfile(data.username);
                setEmail("");
                setPassword("");
                // nav("/"); // Uncomment this if you want to navigate after login
            } else {
                const data = await response.json();
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Login</h2>
                <form className="space-y-6" onSubmit={handleLogIn}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account? <a href="/signup" className="text-teal-500 hover:underline">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}