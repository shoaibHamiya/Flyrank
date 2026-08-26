const express = require("express");
const app = express();
app.use(express.json());

const tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        done: false
    },
    {
        id: 2,
        title: "Build Task API",
        done: false
    },
    {
        id: 3,
        title: "Test API",
        done: true
    }
];

app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }
    const newId = tasks.length + 1;
    const newTask = {
        id: newId,
        title: req.body.title,
        done: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(3000, () => {
    console.log("Task API running on http://localhost:3000");
});