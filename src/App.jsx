import styles from "./App.module.css";
import { useState, useContext, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TodoContext } from "./context/TodoContext";

export default function App() {
  // global todos from context
  const { todos, setTodos } = useContext(TodoContext);

  // derived value (not stored in state)
  const pending = todos.filter((t) => !t.completed).length;

  // UI state
  const [sortBy, setSortBy] = useState("newest");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [lastDeleted, setLastDeleted] = useState([]);

  // theme (saved to localStorage)
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // keep theme synced with <body> + localStorage
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // remove all completed todos
  function handleClearCompleted() {
    const completed = todos.filter((t) => t.completed);
    const remaining = todos.filter((t) => !t.completed);

    setLastDeleted(completed);
    setTodos(remaining);
  }

  // restore deleted todos
  function handleUndo() {
    if (lastDeleted.length === 0) return;

    setTodos((prev) => [...prev, ...lastDeleted]);
    setLastDeleted([]);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Smart Todo</h1>

      {/* Top stats + theme toggle */}
      <div className={styles.topBar}>
        <div>
          <p>Tasks total: {todos.length}</p>
          <p>Pending: {pending}</p>
        </div>

        <button onClick={toggleTheme} className={styles.toggle}>
          {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
        </button>
      </div>

      {/* Search */}
      <input
        className={`${styles.input} ${styles.search}`}
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add task */}
      <TaskForm />

      {/* Filters + actions */}
      <div className={styles.actions}>
        <button className={styles.button} onClick={() => setFilter("all")}>
          All
        </button>

        <button
          className={styles.button}
          onClick={() => setFilter("completed")}>
          Completed
        </button>

        <button className={styles.button} onClick={() => setFilter("pending")}>
          Pending
        </button>

        <button
          className={styles.button}
          onClick={handleClearCompleted}
          disabled={!todos.some((t) => t.completed)}>
          Clear Completed
        </button>

        <button
          className={styles.button}
          onClick={handleUndo}
          disabled={lastDeleted.length === 0}>
          Undo
        </button>
      </div>

      {/* Task list */}
      <TaskList filter={filter} search={search} sortBy={sortBy} />

      {/* Sorting */}
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="priority">Priority (High → Low)</option>
      </select>
    </div>
  );
}
