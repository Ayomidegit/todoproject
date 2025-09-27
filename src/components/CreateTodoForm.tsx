import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, Todo } from "../api/todos";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, unknown, Omit<Todo, "id">>({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
