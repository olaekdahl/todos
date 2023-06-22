import express from 'express';
import { getAllTodos, getTodo, createTodo, toggleTodoComplete } from './todoRepository.js';

const port = 4000;
// Create the server object
const app = express();
app.use(express.json());

// Handle the GET /api/todos route
/**
 * GET /api/todos
 * Send all todos
 */
app.get('/api/todos', (req, res) => {
  const todos = getAllTodos();
  res.send(todos)
});

/**
 * GET /api/todos/:id
 * Send one todo
 */
app.get('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = getTodo(id);
  if (!todo)
    res.status(404).send();
  else
    res.send(todo);
})

app.patch('/api/todos/:id/toggleComplete', (req, res) => {
  const id = req.params.id;
  const todo = toggleTodoComplete(id);
  if (!todo)
    res.status(404).send();
  else
    res.send(todo);
})

/**
 * POST /api/todos
 * Create a new todo
 */
app.post('/api/todos', (req, res) => {
  const todo = req.body;
  const newTodo = createTodo(todo);
  res.status(201).send(newTodo);
});

// Serve static web pages
app.use(express.static("web"))

// Start listening
app.listen(port, () => console.log(`listening on port ${port}`))

// app.listen(port, function () {
//   console.log(`listening on port ${port}`);
// })

// app.listen(port, callbackFunction)
// function callbackFunction() {
//   console.log(`listening on port ${port}`);
// }