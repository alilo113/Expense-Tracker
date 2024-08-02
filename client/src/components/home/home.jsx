import React from "react";
import { Header } from "./header";
import { Main } from "./main";

export function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <Header/>
            <Main/>
            <footer className="bg-gray-800 w-full py-4 text-white text-center">
                <p>&copy; 2024 PennyPilot. All rights reserved.</p>
            </footer>
        </div>
    );
}