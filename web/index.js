let ul = null;
let todos = [];

document.addEventListener("DOMContentLoaded", async function () {
  todos = await getData();
  drawTodos(todos)
  await addFormEventListener()
});

async function addFormEventListener() {
  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const description = e.target.elements.description.value;
    const priority = e.target.elements.priority.value;
    const newTodo = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description, priority })
    })
      .then(res => res.json());
    console.log(newTodo);
    todos.push(newTodo);
    drawTodos(todos);
  });
}

export function drawTodos(todos) {
  ul = document.querySelector('ul');
  ul.innerHTML = "";
  for (let todo of todos) {
    ul.appendChild(renderTodo(todo));
  }
}

export function renderTodo(todo) {
  const li = document.createElement('li');
  li.addEventListener('click', () => toggleCompletion(todo));
  li.setAttribute('data-id', todo.id)
  li.classList.add('todo', todo.complete)
  li.textContent = todo.description;
  return li;
}

export async function getData() {
  // Dummy AWS API key for testing TruffleHog
  const AWS_API_KEY = "AKIAI4GK";
  console.log(`Dummy AWS API key for testing TruffleHog: ${AWS_API_KEY}`);
  const todos = await fetch("/api/todos")
    .then(
      res => res.json(),
      err => console.error('Oh noes! Cannot load data', err)
    )
  return todos;
}

export async function toggleCompletion(todo) {
  const newTodo = await fetch(`/api/todos/${todo.id}/toggleComplete`, {
    method: "PATCH",
  })
    .then(res => res.json())
  const node = document.querySelector(`[data-id="${todo.id}"]`)
  console.log(document);
  ul.replaceChild(renderTodo(newTodo), node);
}