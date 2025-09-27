import { useQuery } from "@tanstack/react-query";
import { fetchTodoById, Todo } from "../api/todos";

export const useTodo = ({ id }: { id: number }) => {
  return useQuery<Todo | undefined>({
    queryKey: ["todo", { id }],
    queryFn: () => fetchTodoById(id),
    enabled: !!id,
  });
};
