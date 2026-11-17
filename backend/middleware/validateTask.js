const allowedPriorities = ["low", "medium", "high"];

function validateTask(req, res, next) {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res
      .status(400)
      .json({ error: "Request body must be a JSON object" });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = body.description ?? "";

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string" });
  }

  if (!allowedPriorities.includes(body.priority)) {
    return res.status(400).json({
      error: "Priority must be low, medium, or high",
    });
  }

  // Keep only the fields the client can change and trim extra spaces
  req.body = {
    title,
    description: description.trim(),
    priority: body.priority,
  };

  next();
}

module.exports = { validateTask };
