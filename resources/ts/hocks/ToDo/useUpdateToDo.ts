import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type { ToDoType } from "../../types/ToDoTypes.js";

export const usePostTodo = async (todo: ToDoType) => {
    console.log('todo=');
    console.log(todo);
    console.log(`url=/api/todo/${todo.id}`);
    const response = await axios.request<ToDoType>({
        url: `/api/todo/${todo.id}`,
        method: "PUT",
        data: {
            id: todo.id,
            title: todo.title,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

const useUpdateToDo = () => {
    const updateToDoMutate = useMutation({
        mutationFn: usePostTodo,
        onSuccess: (data) => { },
        onError: (error) => {
            console.error('Error:', error);
            alert('登録に失敗しました。');
        },
    });

    return { updateToDoMutate };
}

export default useUpdateToDo;
