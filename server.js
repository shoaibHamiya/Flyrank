const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1",
        endpoint: ["/tasks"]
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

app.listen(3000, () => {
    console.log("Task API running on http://localhost:3000");
});