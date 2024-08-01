const express = require("express");
const app = express(); // Create an instance of the Express application
const port = 3000;

app.get("/api", (req, res) => {
    res.json({ message: "This is from the backend" });
});

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});