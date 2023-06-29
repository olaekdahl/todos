
export const Todo = ({ todo, toggleTodo }) => {

  return (
    <>
      <ul
        onClick={event => toggleTodo(todo)}
        style={todo.complete ? { ...styles.todo, ...styles.todoTrue } : { ...styles.todo }}>
        {todo?.description} priority: {todo?.priority}
      </ul>
    </>
  )


}


const styles = {
  todo: {
    backgroundColor: "var(--postit-yellow)",
    padding: "10px",
    margin: "10px",
    width: "100px",
    height: "100px",
    border: "1px solid var(--main-dark)",
  },
  todoTrue: {
    opacity: "0.25",
    textDecoration: "line-through",
  },

}