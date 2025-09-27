import { useQuery } from "@tanstack/react-query";
import { fetchTodos, Todo } from "../api/todos";

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
