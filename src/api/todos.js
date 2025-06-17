const STORAGE_KEY = "todos";

// Get todos from localStorage
export const fetchTodos = async () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return data;
};

// Get a single todo by ID
export const fetchTodoById = async (id) => {
  const data = await fetchTodos();
  const todo = data.find((t) => t.id === parseInt(id));
  if (!todo) throw new Error("Todo not found");
  return todo;
};

// Create a new todo
export const createTodo = async (newTodo) => {
  const todos = await fetchTodos();
  const todoWithId = {
    ...newTodo,
    id: Date.now(),
    completed: false,
  };
  const updated = [...todos, todoWithId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return todoWithId;
};

// Update a todo
export const updateTodo = async (updatedTodo) => {
  const todos = await fetchTodos();
  const updated = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updatedTodo;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const todos = await fetchTodos();
  const updated = todos.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
};
