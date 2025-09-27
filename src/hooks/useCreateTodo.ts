import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { createTodo, Todo } from "../api/todos";

export const useCreateTodo = (
  options?: Omit<
    UseMutationOptions<Todo, unknown, Omit<Todo, "id">, unknown>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, unknown, Omit<Todo, "id">>({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    ...options,
  });
};
