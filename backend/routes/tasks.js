const express = require("express");
const { tasks, getNextId } = require("../data/tasks");
const router = express.Router();
const { validateTask } = require("../middleware/validateTask");

function findTaskById(idParam, res) {
  // Reject non-positive integer task IDs
  if (!/^\d+$/.test(idParam) || Number(idParam) < 1) {
    res.status(400).json({ error: "Task ID must be a positive integer" });
    return null;
  }

  const id = Number(idParam);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return null;
  }

  return task;
}

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const task = findTaskById(req.params.id, res);

  if (!task) return;

  res.json(task);
});

router.post("/", validateTask, (req, res) => {
  const newTask = {
    id: getNextId(),
    title: req.body.title,
    description: req.body.description,
    completed: false,
    createdAt: new Date(),
    priority: req.body.priority,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", validateTask, (req, res) => {
  const task = findTaskById(req.params.id, res);

  if (!task) return;

  task.title = req.body.title;
  task.description = req.body.description;
  task.priority = req.body.priority;

  res.json(task);
});

router.patch("/:id/toggle", (req, res) => {
  const task = findTaskById(req.params.id, res);

  if (!task) return;

  task.completed = !task.completed;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const task = findTaskById(req.params.id, res);

  if (!task) return;

  const taskIndex = tasks.findIndex((item) => item.id === task.id);

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

module.exports = router;
