import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { ToDoType } from "../../types/ToDoTypes.js";

export const useAddTodo = async (todo: ToDoType) => {
    const response = await axios.request<ToDoType>({
        url: '/api/todo',
        method: "POST",
        data: {
            title: todo.title,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

const useAddToDo = () => {
    const queryClient = useQueryClient();

    const addToDoMutate = useMutation({
        mutationFn: useAddTodo,
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

    return { addToDoMutate };
}

export default useAddToDo;
