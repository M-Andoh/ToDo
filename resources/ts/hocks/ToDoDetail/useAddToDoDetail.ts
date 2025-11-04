import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { ToDoDetailType, ToDoType } from "../../types/ToDoTypes.js";

export const useAddTodoDetail = async (detail: ToDoDetailType) => {
    const response = await axios.request<ToDoDetailType>({
        url: '/api/todo/detail',
        method: "POST",
        data: {
            to_do_id: detail.to_do_id,
            name: detail.name,
            completed_flag: detail.completed_flag,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

const useAddToDoDetail = () => {
    const queryClient = useQueryClient();

    const addToDoDetailMutate = useMutation({
        mutationFn: useAddTodoDetail,
        onSuccess: (data) => { },
        onError: (error) => {
            console.error('Error:', error);
            alert('登録に失敗しました。' + error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"], });
        },
    });

    return { addToDoDetailMutate };
}

export default useAddToDoDetail;
