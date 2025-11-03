import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type { ToDoDetailType } from "../../types/ToDoTypes.js";

export const usePostTodoDetail = async (detail: ToDoDetailType) => {
    const response = await axios.request<ToDoDetailType>({
        url: `/api/todo/detail/${detail.id}`,
        method: "PUT",
        data: {
            id: detail.id,
            name: detail.name,
            completed_flag: detail.completed_flag,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

const useUpdateToDoDetail = () => {
    const updateToDoDetailMutate = useMutation({
        mutationFn: usePostTodoDetail,
        onSuccess: (data) => { },
        onError: (error) => {
            console.error('Error:', error);
            alert('登録に失敗しました。');
        },
    });

    return { updateToDoDetailMutate };
}

export default useUpdateToDoDetail;
