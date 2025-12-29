import { createContext, useState, useEffect } from "react";

// Global context — shares todos across the entire app
export const TodoContext = createContext();

export function TodoProvider({ children }) {
  // Load todos from localStorage (only once)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("smart_todos");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist todos whenever they change
  useEffect(() => {
    localStorage.setItem("smart_todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
