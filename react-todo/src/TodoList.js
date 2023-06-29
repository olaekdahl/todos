import { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { CreateTodo } from './CreateTodo';

export function TodoList() {
  const [todos, setTodos] = useState([])
  async function fetchTodos() {
    const response = await fetch('/api/todos');
    const tasks = await response.json();
    setTodos(tasks)
  }
  useEffect(() => {
    fetchTodos()
  }, [])
  console.log({ todos })

  return (
    <>
      <h1>Stuff I gotta do today</h1>
      <CreateTodo sendNewTodo={sendNewTodo} />
      <ul style={styles.listWrapper}>
        {todos.map(todo =>
          <Todo todo={todo} toggleTodo={toggleTodo} key={todo.id} />)}
      </ul>
    </>
  );

  async function toggleTodo(todo) {
    const newTodo = await fetch(`/api/todos/${todo.id}/toggleComplete`, {
      method: "PATCH",
    })
      .then(res => res.json())
    // Now that we have the new todo replace the old onChange
    const newTodos = [...todos.filter(t => t.description !== todo.description), newTodo]
    setTodos(newTodos)
  }


  async function sendNewTodo(description, priority, event) {
    event.preventDefault()
    // Make API call to send data to server as a POST
    const newTodo = { description, priority };
    const url = `/api/todos`;
    const theNewTodo = await fetch(url, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(newTodo)
    }).then(res => res.json())
    // Put it in the list. Update the page to show our new todo.
    setTodos([...todos, theNewTodo])
  }
}

const styles = {
  listWrapper: {
    display: "flex",
    flexWrap: "wrap",
    listStyleType: "none",
  },
}