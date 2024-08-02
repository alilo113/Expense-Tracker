const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});