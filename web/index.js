const ul = document.querySelector('ul');
let todos = await getData();
drawTodos(todos)

function drawTodos(todos) {
  ul.innerHTML = "";
  for (let todo of todos) {
    ul.appendChild(renderTodo(todo));
  }
}

function renderTodo(todo) {
  const li = document.createElement('li');
  li.addEventListener('click', () => toggleCompletion(todo));
  li.setAttribute('data-id', todo.id)
  li.classList.add('todo', todo.complete)
  li.textContent = todo.description;
  return li;
}

async function getData() {
  const todos = await fetch("/api/todos")
    .then(
      res => res.json(),
      err => console.error('Oh noes! Cannot load data', err)
    )
  return todos;
}

async function toggleCompletion(todo) {
  const newTodo = await fetch(`/api/todos/${todo.id}/toggleComplete`, {
    method: "PATCH",
  })
    .then(res => res.json())
  const node = document.querySelector(`[data-id="${todo.id}"]`)
  ul.replaceChild(renderTodo(newTodo), node);
}

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