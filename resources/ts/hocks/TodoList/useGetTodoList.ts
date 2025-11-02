import axios from "axios";
import type { ToDoType } from "../../types/ToDoTypes.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getToDoList = async (): Promise<ToDoType[]> => {
    const response = await axios.request<ToDoType[]>({
        url: "/api/todo",
        method: "GET",
    });
    return response.data;
};

const useGetToDoList = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery<ToDoType[]>({
        queryKey: ["todo"],
        queryFn: getToDoList,
    }, queryClient);
    return  { data, isLoading, error } ;
}

export default useGetToDoList;