import { useState } from 'react';

export const CreateTodo = ({ sendNewTodo }) => {
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState(1)

  return (
    <section style={styles.section} id="addTodoSection">
      <form>
        <div className="formField">
          <label htmlFor="description">What do you need to do?</label>
          <input id="description" value={description} onChange={e => setDescription(e.target.value)} name="description" autoComplete="off" style={styles.input} />
        </div>
        <div className="formField">
          <label htmlFor="priority">Priority</label>
          <input id="priority" value={priority}
            onChange={e => setPriority(e.target.value)}
            type="number" step="1" min="1" max="5" name="priority" style={styles.input} />
        </div>
        <div className="formField">
          <button onClick={event => sendNewTodo(description, priority, event)} type="submit">Create to do</button>
        </div>
      </form>
    </section>
  )


}

const styles = {
  section: {
    border: "2px solid var(--main-dark)",
    padding: "15px",
  },
  formField: {
    margin: "10px 0",
  },
  input: { width: "95%" },
}
