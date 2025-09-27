const STORAGE_KEY = "todos";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const data: Todo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return data;
};

export const fetchTodoById = async (id: number): Promise<Todo | undefined> => {
  const data = await fetchTodos();
  const todo = data.find((t: Todo) => t.id === id);
  if (!todo) throw new Error("Todo not found");
  return todo;
};

export const createTodo = async (newTodo: Omit<Todo, "id">): Promise<Todo> => {
  const todos = await fetchTodos();
  const todoWithId: Todo = {
    ...newTodo,
    id: Date.now(),
    completed: false,
  };
  const updated = [...todos, todoWithId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return todoWithId;
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  const todos = await fetchTodos();
  const updated = todos.map((t: Todo) =>
    t.id === updatedTodo.id ? updatedTodo : t
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updatedTodo;
};

export const deleteTodo = async (id: number): Promise<boolean> => {
  const todos = await fetchTodos();
  const updated = todos.filter((t: Todo) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
};
