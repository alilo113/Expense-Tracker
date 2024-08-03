import React from "react";
import { Main } from "./mainContent";
import { Header } from "./header"

export function Home({ userProfile, setUserProfile }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <Header userProfile={userProfile} setUserProfile={setUserProfile} />
            <Main userProfile={userProfile} />
        </div>
    );
}
