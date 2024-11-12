import { RefObject } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./types";

const usePostTodosMutation = (ref: RefObject<HTMLInputElement>) => {
  const queryClient = useQueryClient();

  const { mutate: postTodoMutation, isLoading, error } = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),
      onSuccess: (savedTodo, newTodo) => {
        // APPROACH: Invalidating the cache
        // queryClient.invalidateQueries({
        //   queryKey: ['todos']
        // })

        // APPROACH: Updating the data in the cache
        queryClient.setQueryData<Todo[]>(['todos'], todos => [savedTodo, ...(todos || [])] )

        if (ref.current) ref.current.value = '';
      }  
  });

  return { postTodoMutation,isLoading, error };
};

export default usePostTodosMutation;
