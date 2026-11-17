const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");

const PORT = 4000;

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager backend is working");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
