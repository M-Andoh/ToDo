import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { ToDoDetailType, ToDoType } from "../../types/ToDoTypes.js";

export const useDeleteTodoDetail = async (detail: ToDoDetailType) => {
    const response = await axios.request<ToDoDetailType>({
        url: `/api/todo/detail/${detail.id}`,
        method: "DELETE",
        //data: {
        //    id: detail.id,
        //    to_do_id: detail.to_do_id,
        //    name: detail.name,
        //    completed_flag: detail.completed_flag,
        //},
        //headers: {
        //    'Content-Type': 'application/json',
        //},
    });
    return response.data;
};

const useDeleteToDoDetail = () => {
    const queryClient = useQueryClient();

    const deleteToDoDetailMutate = useMutation({
        mutationFn: useDeleteTodoDetail,
        onSuccess: (data) => { },
        onError: (error) => {
            console.error('Error:', error);
            alert('登録に失敗しました。' + error.message);
        },
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: ["todo"], });
            const prevToDos = queryClient.getQueryData<ToDoType[]>(["todo"]);
            queryClient.setQueryData<ToDoType[]>(["todo"], (oldToDo) => {
                oldToDo?.map((old) => {
                    if (old.id == data.to_do_id) {
                        let newDetails: ToDoDetailType[] = [];
                        old?.to_do_details.map((detail) => {
                            if (detail.id != data.id) {
                                newDetails.push(detail);
                            }
                        });
                        old.to_do_details = newDetails;
                    }
                    return old;
                })
                return oldToDo;
            });
            queryClient.invalidateQueries({ queryKey: ["todo"], });
            return prevToDos;
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"], });
        },
    });

    return { deleteToDoDetailMutate };
}

export default useDeleteToDoDetail;
