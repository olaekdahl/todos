import fs from 'fs';

export function getAllTodos() {
  const todos = readDatabase().todos;
  return todos;
}

/**
 * Returns the todo with the given ID
 * @param {number} id 
 * @returns the todo
 */
export function getTodo(id) {
  const todo = getAllTodos().find(t => t.id === +id)
  return todo
}

export function createTodo(todo) {
  todo.id = Math.max(...getAllTodos().map(t => t.id)) + 1;
  todo.complete = false;
  const todos = [...getAllTodos(), todo];
  saveDatabase({ ...readDatabase(), todos });
  return todo;
}

/**
 * Makes a completed todo uncompleted and vice-versa.
 * @param {number} id 
 * @returns The new todo
 */
export function toggleTodoComplete(id) {
  const todo = getAllTodos().find(t => t.id === +id)
  todo.complete = !todo.complete;
  const todos = [...getAllTodos().filter(todo => todo.id !== +id), todo];
  saveDatabase({ ...readDatabase(), todos });
  return todo;
}

const databaseFile = "./database.json";

const readDatabase = () =>
  JSON.parse(fs.readFileSync(databaseFile))

const saveDatabase = (data) => {
  const str = JSON.stringify(data)
  fs.writeFileSync(databaseFile, str);
}
