// src/hooks/useTodo.js
import { useQuery } from "@tanstack/react-query";
import { fetchTodoById } from "../api/todos";

export const useTodo = (id) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodoById(id),
    enabled: !!id,
  });
};
