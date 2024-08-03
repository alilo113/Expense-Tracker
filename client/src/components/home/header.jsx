import React from "react";

export function Header({ userProfile, setUserProfile }) {

    function handleLogOut(){
        setUserProfile(null); // Use null instead of empty string for clarity
        localStorage.removeItem("username"); // Remove the username from localStorage
    }

    return (
        <header className="bg-teal-600 w-full py-4 text-white shadow-md">
            <h1 className="text-3xl font-bold text-center">PennyPilot</h1>
            {userProfile ? (
                <div className="text-center">
                    <p>Welcome, {userProfile}!</p> {/* Display username directly */}
                    <button onClick={handleLogOut}>Log out</button>
                </div>
            ) : (
                <div className="text-center">
                    <p>Please log in to access more features.</p>
                    {/* Add more content for non-logged-in users here */}
                </div>
            )}
        </header>
    );
}
