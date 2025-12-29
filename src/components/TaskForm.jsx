import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

// Form that creates new tasks
export default function TaskForm() {
  const { todos, setTodos } = useContext(TodoContext);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Ignore empty tasks
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      category,
      completed: false,
      priority,
      dueDate,
    };

    setTodos([...todos, newTodo]);

    // reset inputs
    setTitle("");
    setPriority("low");
    setCategory("General");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <input
        placeholder="Todo title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>General</option>
        <option>Work</option>
        <option>Study</option>
        <option>Personal</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
