import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { ToDoType } from "../../types/ToDoTypes.js";

export const useDeleteTodo = async (todo: ToDoType) => {
    const response = await axios.request<ToDoType>({
        url: `/api/todo/${todo.id}`,
        method: "DELETE",
    });
    return response.data;
};

const useDeleteToDo = () => {
    const queryClient = useQueryClient();

    const deleteToDoMutate = useMutation({
        mutationFn: useDeleteTodo,
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.error('Error:', error);
            alert('登録に失敗しました。' + error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"], });
        }
    });

    return { deleteToDoMutate };
}

export default useDeleteToDo;
