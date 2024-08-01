import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { Home } from "./components/home/home";

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function fetchUsername() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (res.ok) {
          const data = await res.json(); // Await the promise returned by res.json()
          console.log(username)
          setUsername(data.username);
        } else {
          console.log(`Failed to fetch user profile status: ${res.status}`);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    }

    fetchUsername();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home username={username} />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;