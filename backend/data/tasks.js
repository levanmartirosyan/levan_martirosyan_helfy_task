const tasks = [
  {
    id: 1,
    title: "Prepare project proposal",
    description:
      "Write the first draft and share it with the team for feedback.",
    completed: false,
    createdAt: new Date(),
    priority: "high",
  },
  {
    id: 2,
    title: "Review design feedback",
    description:
      "Go through the latest comments and list the requested changes.",
    completed: false,
    createdAt: new Date(),
    priority: "medium",
  },
  {
    id: 3,
    title: "Update README",
    description: "Add setup steps and document the API endpoints.",
    completed: true,
    createdAt: new Date(),
    priority: "low",
  },
  {
    id: 4,
    title: "Test task carousel",
    description:
      "Check next and previous navigation, including wrapping at both ends.",
    completed: false,
    createdAt: new Date(),
    priority: "high",
  },
  {
    id: 5,
    title: "Organize meeting notes",
    description:
      "Sort notes from the weekly planning meeting into the project folder.",
    completed: true,
    createdAt: new Date(),
    priority: "low",
  },
  {
    id: 6,
    title: "Check mobile layout",
    description:
      "Make sure task cards and carousel controls fit on a phone screen.",
    completed: false,
    createdAt: new Date(),
    priority: "medium",
  },
];

let nextId = 7;

function getNextId() {
  return nextId++;
}

module.exports = { tasks, getNextId };
