## Run the App

### Backend

```bash
cd backend
npm install
npm start
The API runs at http://localhost:4000.
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
The frontend runs at http://localhost:3000.
```

## Task Model

```json
{
  "id": 1,
  "title": "Prepare project proposal",
  "description": "Write the first draft.",
  "completed": false,
  "createdAt": "2026-11-17T08:30:00.000Z",
  "priority": "high"
}
```

The API stores `createdAt` as a JavaScript `Date`; JSON responses serialize it as an ISO date string.

## API Details

### `GET /api/tasks`

Returns all tasks.

- Success: `200 OK`
- Response: an array of task objects

### `POST /api/tasks`

Creates a task. Send a JSON body:

```json
{
  "title": "Prepare project proposal",
  "description": "Write the first draft.",
  "priority": "high"
}
```

The API assigns `id`, `completed` (initially `false`), and `createdAt`.

- Success: `201 Created`, with the created task
- Invalid input: `400 Bad Request`

### `PUT /api/tasks/:id`

Updates a task’s title, description, and priority. Send all three editable fields in the JSON body.

- Success: `200 OK`, with the updated task
- Invalid ID or input: `400 Bad Request`
- Task not found: `404 Not Found`

### `DELETE /api/tasks/:id`

Deletes the task with the given ID.

- Success: `204 No Content`
- Invalid ID: `400 Bad Request`
- Task not found: `404 Not Found`

### `PATCH /api/tasks/:id/toggle`

Toggles the task’s completion status.

- Success: `200 OK`, with the updated task
- Invalid ID: `400 Bad Request`
- Task not found: `404 Not Found`

### Error response

Errors return a JSON object with a message, for example:

```json
{
  "error": "Task not found"
}
```

Unexpected server errors return `500 Internal Server Error`.

## Assumptions and Design Decisions

- Tasks are stored in an in-memory array; data resets when the backend restarts.
- Titles are required; descriptions may be empty.
- Priority must be `low`, `medium`, or `high`.
- The backend assigns task IDs and creation dates.
- The frontend filters tasks by all, pending, and completed status.
- The carousel loops through the tasks currently shown by the selected filter.

## Time Spent

- Backend: ~ 1 Hour 45 Minutes
- Frontend carousel, styling: ~ 1 Hour 55 Minutes
- Testing and debugging: ~ 10 Minutes
- Total: ~ 4 Hours
