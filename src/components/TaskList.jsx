import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

// Renders the list of tasks with filtering + sorting
export default function TaskList({ filter, search, sortBy }) {
  const { todos } = useContext(TodoContext);

  let visibleTodos = [...todos];

  // Filter by status
  if (filter === "completed") {
    visibleTodos = visibleTodos.filter((t) => t.completed);
  }

  if (filter === "pending") {
    visibleTodos = visibleTodos.filter((t) => !t.completed);
  }

  // Search
  if (search.trim() !== "") {
    visibleTodos = visibleTodos.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort options
  if (sortBy === "newest") {
    visibleTodos.sort((a, b) => b.id - a.id);
  }

  if (sortBy === "oldest") {
    visibleTodos.sort((a, b) => a.id - b.id);
  }

  if (sortBy === "priority") {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    visibleTodos.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  if (visibleTodos.length === 0) {
    return (
      <p style={{ marginTop: "14px", opacity: 0.6 }}>
        No tasks yet — add something!
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {visibleTodos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
