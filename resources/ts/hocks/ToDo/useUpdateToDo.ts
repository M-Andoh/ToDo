import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { ToDoType } from "../../types/ToDoTypes.js";

export const usePostTodo = async (todo: ToDoType) => {
    const response = await axios.request<ToDoType>({
        url: `/api/todo/${todo.id}`,
        method: "PATCH",
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
    const queryClient = useQueryClient();

    const updateToDoMutate = useMutation({
        mutationFn: usePostTodo,
        onSuccess: (data) => {
         },
        onError: (error) => {
            console.error('Error:', error);
            alert('登録に失敗しました。');
        },
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: ["todo"], });
            const prevToDos = queryClient.getQueryData<ToDoType[]>(["todo"]);
            queryClient.setQueryData<ToDoType[]>(["todo"], (oldToDo) => 
                oldToDo?.map((old)=>{
                    if(old.id==data.id){
                        return {
                            ...old,
                            title: data.title,
                        }
                    }
                    return old;
                })
            );
            return prevToDos;
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"], });
        }
    });

    return { updateToDoMutate };
}

export default useUpdateToDo;
