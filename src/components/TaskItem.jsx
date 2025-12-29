import styles from "./TaskItem.module.css";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

// A single todo item
export default function TaskItem({ todo }) {
  const { todos, setTodos } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  const isToday =
    todo.dueDate &&
    new Date(todo.dueDate).toDateString() === new Date().toDateString();

  function saveEdit() {
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...t, title: newTitle } : t))
    );

    setIsEditing(false);
  }

  function toggleCompleted() {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTodo() {
    setTodos(todos.filter((t) => t.id !== todo.id));
  }

  return (
    <li className={styles.item} style={{ opacity: todo.completed ? 0.6 : 1 }}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleCompleted}
        />

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <>
            <span
              className={styles.title}
              style={{
                opacity: todo.completed ? 0.5 : 1,
                textDecoration: todo.completed ? "line-through" : "none",
              }}>
              {todo.title}
            </span>

            <span className={`${styles.badge} ${styles[todo.priority]}`}>
              [{todo.priority}]
            </span>

            <small> ({todo.category}) </small>
          </>
        )}
      </label>

      {isToday && !todo.completed && (
        <span className={`${styles.badge} ${styles.today}`}>Due Today</span>
      )}

      {isOverdue && (
        <span className={`${styles.badge} ${styles.overdue}`}>Overdue</span>
      )}

      {todo.dueDate && (
        <small style={{ marginLeft: "8px" }}>(due: {todo.dueDate})</small>
      )}

      {/* Buttons stacked */}
      <div className={styles.actions}>
        {isEditing ? (
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={saveEdit}>
            💾 Save
          </button>
        ) : (
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => setIsEditing(true)}>
            ✏️ Edit
          </button>
        )}

        <button
          className={`${styles.button} ${styles.danger}`}
          onClick={deleteTodo}>
          🗑 Delete
        </button>
      </div>
    </li>
  );
}
