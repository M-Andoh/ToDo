import { useQueryClient } from "@tanstack/react-query";
import type { ToDoType } from "../../types/ToDoTypes.js";

const useCurrentToDoList = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData<ToDoType[]>(["todo"]);
}

export default useCurrentToDoList;