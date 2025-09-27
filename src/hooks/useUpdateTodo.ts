import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo, Todo } from "../api/todos";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, unknown, Todo>({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
